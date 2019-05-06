import express from 'express'
import dbCof from '../db/db'
import mysql from 'mysql'
import crypto from 'crypto'


const router = express.Router();

let pool = mysql.createPool(dbCof);
/* 注册请求 */
router.post('/', (req, res, next) => {
    if (!('user' in req.body)) {
        res.json({
            "err_msg": '用户名不能为空'
        })
    }
    if (!('paw' in req.body)) {
        res.json({
            "err_msg": '密码不能为空'
        })
    }
    pool.getConnection((err, connection) => {
        let sql_a = "SELECT * FROM user";
        let md5 = crypto.createHash('md5');
        let _paw = md5.update(req.body.paw).digest('base64');
        let sql_b = "INSERT INTO user (user,paw) VALUES ('" + req.body.user + "','" + _paw + "')";
        connection.query(sql_a, (err, results) => {
            if (err) {
                throw err;
            } else {
                let state = false;
                results.forEach(item => {
                    if (item.user == req.body.user) {
                        state = true;
                    }
                });
                if (state) {
                    res.json({
                        "err_code": "1",
                        "msg": "用户已经存在！"
                    })
                } else {
                    connection.query(sql_b, (err, results_b) => {
                        if (err) {
                            throw err;
                        } else {
                            res.json({
                                "err_code": "200",
                                "msg": "注册成功！"
                            })
                        }
                    });
                }
            }
        })
    })

})

module.exports = router;