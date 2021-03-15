const express=require('express')
const pathlib=require('path');

let server=express();
server.listen(8080);

// server.use(express.static('www/')); //express中的static中间件
                                    //读取静态文件，参数是文件路径,只要是文件都会读取，没有选择限制
 server.get('/a',(req,res,next)=>{
     console.log(pathlib.resolve('www/2.html'))
     res.sendFile(pathlib.resolve('www/2.html'));
 })