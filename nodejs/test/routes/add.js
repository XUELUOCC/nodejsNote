const router=require('koa-router')();

router.post('/add',async(ctx,next)=>{
    ctx.response.body="新增接口"
    console.log(ctx.request.fields)
})

module.exports=router;