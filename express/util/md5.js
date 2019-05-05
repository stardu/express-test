import crypto from 'crypto'

function md5(str) {
    let obj = crypto.createHash('md5');
    obj.updata(str);
    return obj.digest('hex');
}

export default { md5 }