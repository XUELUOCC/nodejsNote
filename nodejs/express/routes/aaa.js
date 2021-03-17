const express=require('express');

let router=express.Router();

router.get('/a',(req,res,next)=>{
    res.send('a')
})
router.get('/b',(req,res,next)=>{
    res.send('b');
})
router.get('/c',(req,res,next)=>{
    res.send('c');
})

module.exports=router;