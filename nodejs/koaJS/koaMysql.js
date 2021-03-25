const koa=require('koa');
const mysql=require('mysql');

let server=new koa();
server.listen(8080);

//创建数据库连接
const db=mysql.createConnection({
    post:'localhost',
    port:3306,
    user:'root',
    password:'root',
    database:'test'   //数据库名
})

server.use(async ctx=>{
    await db.query('SELECT * FROM user_table',(err,data,fields)=>{   //查的是数据库名里面的表user_login
        if(err){
            console.log(err)
        }
        console.log(data)
    });
    ctx.response.body='aaaa'
   
})