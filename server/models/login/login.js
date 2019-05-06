
import mysql from 'mysql'
import dbCof from '../../db/db'

let pool = mysql.createPool(dbCof);


class Login {
    constructor(){

    }
    toLogin(req,res){
        pool.getConnection((err, connection) => {
            let md5 = crypto.createHash('md5');
            let _paw = md5.update(req.body.paw).digest('base64');
            let sql = "SELECT user,paw FROM user WHERE user = '" + req.body.user + "' AND paw = '" + _paw + "'";
            connection.query(sql, (err, results) => {
                return results;
            });
        })
    }
}

export default new Login();