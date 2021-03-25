const koa=require('koa');
const router=require('koa-router');
const Mysql=require('mysql-pro');

let server=new koa();
server.listen(8080);

//mysql-pro的使用
let db=new Mysql({
    mysql:{
        post:'localhost',
        port:3306,
        user:'root',
        password:'root',
        database:'test'   //数据库名
    }
})

let r1=router();
server.use(r1.routes());

r1.get('/user',async ctx=>{
    let id=ctx.query.id;
    try {
        await db.startTransaction();  //开启事务
        let data= await db.executeTransaction('SELECT * FROM user_table WHERE ID=?',[id]);  //占位符，防止sql注入
        let res='sssss';
        await db.stopTransaction();
        console.log([data])
        ctx.response.body=data
        // console.log(ctx.response)
    } catch (error) {
        console.log(error)
        ctx.response.body="数据库在维护中..."
    }
   
})
