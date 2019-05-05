import express from 'express'
import dbCof from '../db/db'
import mysql from 'mysql'
import crypto from 'crypto'
import jwt from 'jsonwebtoken' //用来生成token

const router = express.Router();

let pool = mysql.createPool(dbCof);
/* 登录请求 */
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
        let md5 = crypto.createHash('md5');
        let _paw = md5.update(req.body.paw).digest('base64');
        let sql = "SELECT user,paw FROM user WHERE user = '" + req.body.user + "' AND paw = '" + _paw + "'";
        connection.query(sql, (err, results) => {
            if (err) {
                throw err;
            } else {
                if (results.length == 0) {
                    res.json({
                        "err_code": "300",
                        "err_msg": '该用户不存在'
                    })
                } else {

                    let content = { name: req.body.user }; // 要生成token的主题信息
                    let secretOrPrivateKey = "jwt"; // 这是加密的key（密钥）
                    let token = jwt.sign(content, secretOrPrivateKey, {
                        expiresIn: 60 * 60 * 1 // 1小时过期
                    });

                    res.json({
                        "err_code": "200",
                        "token": token,
                        "err_msg": '登录成功'
                    })
                }
            }
        });
    })
})
module.exports = router;