const express=require('express');
const multer=require('multer');

let server=express();
server.listen(8080);

server.use(multer({dest:'upload/'}).any());  //表示吗，multer中什么文件数据都可以接收

server.post('/upload',(req,res,next)=>{
    // console.log(req)
    console.log(req.body)
    console.log(req.files)
    // res.end();
})
