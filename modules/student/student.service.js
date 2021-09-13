(function (){
    'use strict'

    module.exports = {
        createStudent: createStudent,
        fetchStudents: fetchStudents
    };

    const StudentModel = require('./student.module')().StudentModel;

    function createStudent(student) {
        return StudentModel.create(student);
    }

    function fetchStudents() {
        return StudentModel.find({}).exec();
    }
})();
