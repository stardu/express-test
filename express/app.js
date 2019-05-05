var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import login from './routes/login'
import register from './routes/register'
import message from './routes/message'
import form from './routes/form'

var db = require('./public/javascripts/db')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json()); //数据JSON类型
app.use(bodyParser.urlencoded({ extended: false })); //解析post请求数据

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置允许跨域访问该服务.
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

/* 使用中间件 */

app.use('/api/login', login);
app.use('/api/register', register);

/* token验证 */
app.use((req, res, next) => {
    let token = req.get("Authorization").split(' ')[1]; // 从Authorization中获取token
    let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
    jwt.verify(token, secretOrPrivateKey, (err, decode) => {
        if (err) { //  时间失效的时候 || 伪造的token
            res.json({
                "err_code": '401'
            })
        } else {
            next();
        }
    })
})

app.use('/api/message', message);
app.use("/api/form", form);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});



module.exports = app;