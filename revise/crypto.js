const crypto=require('crypto');
 
let obj=crypto.createHash('md5'); //s设置加密方式
obj.update('223334');  //创建内容
console.log(obj.digest('hex')); //输出十六进制