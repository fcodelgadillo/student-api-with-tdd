(function (){
    'use strict';

    const express = require('express');
    const router = express.Router();

    const StudentMiddleware = require('./student.module')().StudentMiddleware;
    router.post('/', StudentMiddleware.addStudent,
        function(req, res){
        res.status(200).json(req.response);
    });

    module.exports = router;
})();
