const express=require('express');

let server=express();
server.listen(8080);

server.get('/a',(req,res,next)=>{
    console.log('aaaaa');
    res.send([1,2,2,3]);
    next();  //有next(),将会执行下一步
})

//没有next(),此处不会执行
server.get('/a',(req,res,next)=>{
    console.log('bbbb');
    res.send([1,2,2,3,4])
})

server.get('/b',(req,res,next)=>{
    res.sendStatus(404);
})
