const mysql=require('mysql')

let db=mysql.createConnection({  //连接数据库createConnection  参数：host,part,user,password,database
        host:'localhost',
        port:3306,
        user:'root',
        password:'root',
        database:'test'
    });
    //nodejs操作数据库
db.query("INSERT INTO user_table (ID,name,gender,chinese,math,english) VALUES(0,'王五','男',30,50,120)",(err,data)=>{   //查询
    if(err){
        console.log('出错'+err)
    }else{
        console.log(data);
    }
})
