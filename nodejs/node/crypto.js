const crypto=require('crypto');

let obj=crypto.createHash('md5');  //加密方式：md5

obj.update('123456');  //添加内容
console.log(obj.digest('hex'));  //hex十六进制