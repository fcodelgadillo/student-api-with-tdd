(function (){
    'use strict';

    module.exports = {
        addStudent: addStudent,
        getStudents: getStudents
    };

    const StudentService = require('./student.module')().StudentService;

    function addStudent(req, res, next) {

        StudentService.createStudent(req.body).then(success).catch(failure);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(error) {
            next(error);
        }
    }

    function getStudents(req, res, next) {

        StudentService.fetchStudents().then(success);

        function success(data) {
            req.response = data;
            next();
        }

        function failure(err) {
            next(err);
        }
    }

})();
