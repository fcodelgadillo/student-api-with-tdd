'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

const app = require('../../app');

const Fixtures = require('../fixtures/fixtures');
const StudentFixture = Fixtures.StudentFixture;

const baseUri = '/students';

describe('StudentController', function (){

    describe("POST " + baseUri, function (){

        it('should add a new student', function (done){

            request(app)
                .post(baseUri)
                .send(StudentFixture.newStudent)
                .end(function (err, res){
                expect(res.status).to.equal(200);
                expect(res.body).to.not.equal({});
                expect(res.body._id).to.not.equal(undefined);
                expect(res.body.firstName).to.equal(StudentFixture.createdStudent.firstName);
                done();
            });

        });

    });

});

