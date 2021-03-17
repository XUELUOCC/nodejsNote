const express=require('express');
const cookieParser=require('cookie-parser');

let server=express();
server.listen(8080);

server.use(cookieParser('aljbdvjafdadgbhalg'));  //添加秘钥

//
server.get('/a',(req,res,next)=>{
    //cookieParser接收
    console.log(req.cookies);  //cookies是中间件带来的
    console.log(req.signedCookies)

    //express本身发送,但不能接收
    res.cookie('c',5,{signed:true});      //三个参数 --名字--值--选项配置项signed:true(表示需要签名)
    res.send('aaa'); 
})