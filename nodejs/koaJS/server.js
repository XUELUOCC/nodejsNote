const koa=require('koa');
const router=require('koa-router');

let server=new koa();
server.listen(8080);

//创建路由
let r1=router();

//确定什么时候使用router
server.use(r1.routes());

//路由列表
r1.get('/a',async(ctx,next)=>{
    ctx.response.body='aaaaaa';
    ctx.response.set('a',12);
    // ctx.response.status=403;
})
r1.post('/aa',()=>{

})
 