const chai = require('chai');
const expect = chai.expect;

const StudentModule = require('../../../modules/student/student.module');

describe('StudentModule', function (){

    describe('student.module file', function (){

        it('should confirm StudentModule function exist', function (){

            expect(StudentModule).to.be.a('function');
        });

        it('should confirm StudentModule function returns an object', function (){

            expect(StudentModule()).to.be.a('object');
        });

        it('should confirm StudentController function exist', function() {

            expect(StudentModule().StudentController).to.be.a('function');
        });

        it('should confirm StudentMiddleware object exist', function(){

            expect(StudentModule().StudentMiddleware).to.be.a('object');
        });

        it('should confirm StudentService object exist', function (){

            expect(StudentModule().StudentService).to.be.a('object');
        });

        it('should confirm StudentModel function exist', function(){

            expect(StudentModule().StudentModel).to.be.a('function');
        });
    });
});
