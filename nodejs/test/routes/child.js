const router=require('koa-router')();

// router.get('/',async(ctx,next)=>{
//     ctx.response.body='进入children接口'
// })

router.get('/child',async(ctx,next)=>{
    ctx.response.body='children接口内容'
})

module.exports=router;