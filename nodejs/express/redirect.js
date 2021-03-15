const express=require('express');

let server=express();
server.listen(8080);

server.get('/a',(req,res,next)=>{
    console.log('a重定向');
    res.redirect('https://www.baidu.com/');   //当访问/a时，将会重定向到htts://www.baidu.com/
})