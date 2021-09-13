(function (){
    'use strict';

    module.exports = {
        init: init
    };

    const mongoose = require('mongoose');
    const mongodbConfig = require('../../config/mongodb/mongodb-config.json').mongodb;

    function prepareConnectionString(config) {

        let connectionString = 'mongodb+srv://';
        if (config.user) {
            connectionString += config.user + ':' + config.password + '@';
        }

        connectionString += config.server + '/' + config.database + '?' + config.options;

        return connectionString;
    }

/*
    const URI = process.env.MONGO_URL;

    mongoose
        .connect(URI, {
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then((db) => console.log("db is connected"))
        .catch((err) => console.log(err));
*/


    function init() {

        const connectionString = prepareConnectionString(mongodbConfig);

        mongoose.connect(connectionString, {
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
            .then((db) => console.log("db is connected"))
            .catch((err) => console.log(err));
    }

})();
