const express=require('express');

let router=express.Router();  //创建一个路由
router.get('/',(req,res,next)=>{  //----/article
    res.send('文章首页')
})
router.get('/:id',(req,res,next)=>{  //----/article/123
    res.send('文章内容')
})
router.get('/:id/comment',(req,res,next)=>{  //----/article/123/comment
    res.send('文章评论')
})
router.get('/:id/edit',(req,res,next)=>{   //----/article/123/edit
    res.send('文章编辑')
})

router.use('/aaa',require('./aaa'));

module.exports=router
