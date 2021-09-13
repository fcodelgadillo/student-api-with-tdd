const chai = require('chai');
const expect = chai.expect;

const MongoDBModule = require('../../../modules/mongodb/mongodb.module');

describe('MongoDBModule', function() {

    describe('mongodb.modulefile', function () {

        it('should read the mongodb.module file', function () {
            // Write expectations here
            expect(MongoDBModule).to.be.a('object');

        });

        it('Should confirm MongoDBUtil exist', function (){
           expect(MongoDBModule.MongoDBUtil).to.be.a('object');
        });
    });
});
