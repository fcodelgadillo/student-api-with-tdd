(function (){
    'use strict';

    module.exports =init;

    function init() {
        return {
            StudentController: require('./student.controller'),
            StudentMiddleware: require('./student.middleware'),
            StudentService: require('./student.service'),
            StudentModel: require('./student.model')
        };
    }
})();
