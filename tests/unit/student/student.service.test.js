'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
require('sinon-mongoose');

const mongoose = require('mongoose');

const StudentModule = require('../../../modules/student/student.module')();
const StudentModel = StudentModule.StudentModel;
const StudentService = StudentModule.StudentService;

const Fixtures = require('../../fixtures/fixtures');
const StudentFixture = Fixtures.StudentFixture;
const ErrorFixture = Fixtures.ErrorFixture;

let StudentModelMock;

describe('StudentService', function(){

    // This function will create the mock before each test runs
    beforeEach(function(){
        StudentModelMock = sinon.mock(StudentModel);
    });

    // This will restore the mock function to original
    afterEach(function (){
        StudentModelMock.restore();

        mongoose.models = {};
        mongoose.modelSchemas = {};

        return mongoose.connection.close();
    });

    describe('createStudent', function (){

        let newStudent,
            expectedCreatedStudent,
            expectedError;

        //test case for student creation
        it('should successfully create a new student', function(){
            // creation of new student
            newStudent = StudentFixture.newStudent;
            expectedCreatedStudent = StudentFixture.createdStudent;

            // check if things worked
            StudentModelMock.expects('create')
                .withArgs(newStudent)
                .resolves(expectedCreatedStudent);

            return StudentService.createStudent(newStudent)
                .then(function (data){
                StudentModelMock.verify();

                expect(data).to.deep.equal(expectedCreatedStudent);
            });
        });

        // test case for error on student creation
        it('should throw error while creating student', function (){

            expectedError = ErrorFixture.unknownError;
            newStudent = StudentFixture.newStudent;

            StudentModelMock.expects('create')
                .withArgs(newStudent)
                .rejects(expectedError);

            return StudentService.createStudent(newStudent).catch(function (error){

                StudentModelMock.verify();

                expect(error).to.deep.equal(expectedError);
            });
        });


        describe('fetchCustomers', function (){
            let expectedStudents,
                expectedError;

            it('should successfully fetch all students', function (){
                expectedStudents = StudentFixture.students;
                StudentModelMock.expects('find').withArgs({}).chain('exec').resolves(expectedStudents);

                return StudentService.fetchStudents().then(function (data){
                    StudentModelMock.verify();

                    expect(data).to.deep.equal(expectedStudents);
                });
            });

            it('should throw an error while fetching all students', function(){
                expectedError = ErrorFixture.unknownError;

                StudentModelMock.expects('find').withArgs({}).chain('exec').rejects(expectedError);

                return StudentService.fetchStudents().catch(function (error){

                    StudentModelMock.verify();
                    expect(error).to.deep.equal(expectedError);
                });
            });
        });
    });
});

