const koa=require('koa');
const router=require('koa-router');

let server=new koa();
server.listen(8080);

// server.use(async(ctx,next)=>{
//     console.log(ctx.request.query)
// })

let r1=router();
server.use(r1.routes());

r1.get('/api/:name/:age',async(ctx,next)=>{
    console.log(ctx.params)
})
r1.get('/aaa',async(ctx,next)=>{
    console.log(ctx.request.query)
})