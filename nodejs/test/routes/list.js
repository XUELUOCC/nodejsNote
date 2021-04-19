const router=require('koa-router')();

router.get('/',async(ctx,next)=>{
    ctx.response.body='测试列表接口list'
})

router.get('/list',async(ctx,next)=>{
    console.log(ctx.response.query)
    let arr=[
        {
            name:'name1',
            age:12
        },
        {
            name:'name2',
            age:13
        }
    ]
    ctx.response.body=arr;
})

router.get('/list2',async(ctx,next)=>{
    ctx.response.body='第二个list列表'
})

let child=require('./child')
router.use('/list',child.routes())

module.exports=router;