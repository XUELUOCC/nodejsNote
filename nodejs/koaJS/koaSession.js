const koa=require('koa');
const session=require('koa-session');

let server=new koa();
server.listen(8080);

server.keys=[   //增加session的安全性
    'dfgshbs',
    'hgjgmndty',
    'rthytrhgf'
]

server.use(session({},server));
server.use(async ctx=>{
    console.log('qqqq')
    if(!ctx.session['count']){
        ctx.session.count=1;
        console.log('a')
    }else{
        ctx.session.count++;
        console.log('b')
    }
    console.log(ctx.session.count)
    ctx.response.body=`欢迎您${ctx.session.count}来访`
})