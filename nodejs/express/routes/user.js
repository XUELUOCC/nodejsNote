const express=require('express');

let router=express.Router();

router.get('/:id/info',(req,res,next)=>{
    res.send('用户信息')
})
router.get('/:id/login',(req,res,next)=>{
    res.send('用户登录')
})
module.exports=router;