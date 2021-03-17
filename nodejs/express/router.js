const express=require('express');

let server=express();
server.listen(8080);

// let articleRouter=express.Router();  //创建一个路由
server.use('/article',require('./routes/article'))
// server.use('/article',articleRouter); //路径是/article的使用articleRouter

// articleRouter.get('/',(req,res,next)=>{  //----/article
//     res.send('文章首页')
// })
// articleRouter.get('/:id',(req,res,next)=>{  //----/article/123
//     res.send('文章内容')
// })
// articleRouter.get('/:id/comment',(req,res,next)=>{  //----/article/123/comment
//     res.send('文章评论')
// })
// articleRouter.get('/:id/edit',(req,res,next)=>{   //----/article/123/edit
//     res.send('文章编辑')
// })

// let aaaRouter=express.Router();
// articleRouter.use('/aaa',aaaRouter);  //当article的路径后是/aaa时，调用aaaRouter-----/article/aaa/a

// aaaRouter.get('/a',(req,res,next)=>{
//     res.send('a')
// })
// aaaRouter.get('/b',(req,res,next)=>{
//     res.send('b');
// })
// aaaRouter.get('/c',(req,res,next)=>{
//     res.send('c');
// })

// let userRouter=express.Router();
server.use('/user',require('./routes/user'));

// userRouter.get('/:id/info',(req,res,next)=>{
//     res.send('用户信息')
// })
// userRouter.get('/:id/login',(req,res,next)=>{
//     res.send('用户登录')
// })
