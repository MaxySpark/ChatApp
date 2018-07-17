const express = require("express");
const bodyParser = require('body-parser');
const ejs = require('ejs');
const http = require('http');
const cookieParser = require('cookie-parser');
const validator = require('express-validator');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');

const container = require('./container');

container.resolve(function(users){
    const app = setupServer();

    function setupServer() {
        const app = express();
        const server = http.createServer(app);
        server.listen(3000,function(){
            console.log('Listening To Port 3000!');
        });

        configureExpress(app);

         //Setup router
         const router = require('express-promise-router')();

         users.setRouting(router);

         app.use(router);   

    }


    function configureExpress(app) {

        require('./passport/passport-local');

        mongoose.Promise = global.Promise;
        const mongoDB = 'mongodb://127.0.0.1:27017/chatapp';
        mongoose.connect(mongoDB,{ useNewUrlParser: true });
        app.use(express.static('public'));
        app.use(cookieParser());
        app.set('view engine','ejs');
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended : true}));

        app.use(validator());
        app.use(session({
            secret : 'abcdefgh',
            resave : true,
            saveUninitialized : true,
            store : new MongoStore({mongooseConnection : mongoose.connection})
        }));
        app.use(flash());
        app.use(passport.initialize());
        app.use(passport.session());
    }
        

    
});