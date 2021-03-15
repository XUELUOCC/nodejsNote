const express=require('express');
const body=require('body-parser');

let server=express();
server.listen(8080);

server.use(body.urlencoded({extended:false}));

server.get('/a',(req,res,next)=>{
    console.log(req.query)  //获取前台地址栏中传递的参数数据
})

server.post('/upload',(req,res,next)=>{
    console.log(req.body)
})
