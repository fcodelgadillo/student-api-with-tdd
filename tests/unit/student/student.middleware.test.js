'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const bluebird = require('bluebird');
const Promise = bluebird.Promise;

const StudentModule = require('../../../modules/student/student.module')();
const StudentMiddleware = StudentModule.StudentMiddleware;
const StudentService = StudentModule.StudentService;

const Fixtures = require('../../fixtures/fixtures');
const StudentFixture = Fixtures.StudentFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let req, res, next;

describe('StudentMiddleware', function (){

    beforeEach(function(){
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = sinon.spy();
    });

    describe('addStudent', function(){

        let createStudent,
            createStudentPromise,
            expectedCreatedStudent,
            expectedError;

        beforeEach(function (){
            createStudent = sinon.stub(StudentService, 'createStudent');
            req.body = StudentFixture.newStudent;
        });

        afterEach(function(){
            createStudent.restore();
        });


        it('should successfully create a new student', function (){
            expectedCreatedStudent = StudentFixture.createdStudent;
            createStudentPromise = Promise.resolve(expectedCreatedStudent);

            createStudent.withArgs(req.body).returns(createStudentPromise);

            StudentMiddleware.addStudent(req, res, next);

            sinon.assert.callCount(createStudent, 1);

            return createStudentPromise.then(function (){
                expect(req.response).to.be.a('object');

                expect(req.response).to.deep.equal(expectedCreatedStudent);

                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw error while creating the new costumer', function (){
            expectedError = ErrorFixture.unknownError;
            createStudentPromise = Promise.reject(expectedError);

            createStudent.withArgs(req.body).returns(createStudentPromise);

            StudentMiddleware.addStudent(req, res, next);

            sinon.assert.callCount(createStudent, 1);

            return createStudentPromise.catch(function (error){
                expect(error).to.be.a('object');
                expect(error).to.be.deep.equal(expectedError);
            });
        });

    });

    describe('getStudents', function(){
        let fetchStudents,
            fetchStudentsPromise,
            expectedStudents,
            expectedError;

        beforeEach(function (){
            fetchStudents = sinon.stub(StudentService, 'fetchStudents');
            req.body = {};
        });

        afterEach(function () {
            fetchStudents.restore();
        });

        it('should successfully get all students', function (){

            expectedStudents = StudentFixture.students;

            fetchStudentsPromise = Promise.resolve(expectedStudents);

            fetchStudents.returns(fetchStudentsPromise);

            StudentMiddleware.getStudents(req, res, next);

            sinon.assert.callCount(fetchStudents, 1);

            return fetchStudentsPromise.then(function () {

                expect(req.response).to.be.a('array');

                expect(req.response.length).to.equal(expectedStudents.length);

                expect(req.response).to.deep.equal(expectedStudents);

                sinon.assert.callCount(next, 1);
            });
        });

        it('should throw an error while getting all customers', function (){
            expectedError = ErrorFixture.unknownError;
            fetchStudentsPromise = Promise.reject(expectedError);
            fetchStudents.returns(fetchStudentsPromise);
            StudentMiddleware.getStudents(req, res, next);
            sinon.assert.callCount(fetchStudents, 1);

            return fetchStudentsPromise.catch(function (error){
                expect(error).to.be.a('object');
                expect(error).to.deep.equal(expectedError);
            });
        });
    });

});





