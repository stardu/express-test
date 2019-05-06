import crypto from 'crypto'
import jwt from 'jsonwebtoken' //用来生成token
import login from '../../models/login/login'

class LoginControlleer{
    constructor(){

    }
    async toLogin(req,res,next){
        console.log('hahaha');
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
        try {
            var results = await login.toLogin();
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
        } catch (error) {
          console.log(error);
        }
    }
}

export default new LoginControlleer();

