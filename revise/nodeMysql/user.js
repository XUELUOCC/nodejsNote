const mysql=require('mysql');
const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');
const crypto=require('crypto');

let key='habfvdfvyhsdbkjdfvbhk;;;;adfgvdjfv,'
function md5(str){
    let obj=crypto.createHash('md5');
    obj.update(str);
    return obj.digest('hex');
}

//双重加密
function md5_2(str){
   return md5(md5(str)+key);
}

let db=mysql.createPool({
    host:'192.168.44.128',
    port:3306,
    user:'root',
    password:'123456',
    database:'user'
});
let server=http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url,true);
    let {user,pass}=query;
    console.log(pathname)
    switch(pathname){
        case '/reg':
            //校验
            if(!user){
                res.write('{"err":1,"msg":"please input username "}');
                res.end();
            }else if(!pass){
                res.write('{"err":1,"msg":"please input password "}');
                res.end();
            }else if(!/^\w{4,16}$/.test(user)){
                res.write('{"err":1,"msg":"username is invalid "}');
                res.end();
            }else if(/['|"]/.test(pass)){
                res.write('{"err":1,"msg":"password is invalid "}');
                res.end();
            }else{
                console.log(user)
                console.log(`SELECT * FROM user WHERE username='${user}'`)
                db.query(`SELECT * FROM user WHERE username='${user}'`,(err,data)=>{
                    
                    if(err){
                        console.log('regSelect'+err)
                        res.write('{"err":1,"msg":"database error "}');
                        res.end();
                    }else if(data.length>0){
                        res.write('{"err":1,"msg":"username is exsits "}');
                        res.end();
                    }else{
                        console.log(`INSERT INTO user (ID,username,password) VALUES(0,'${user}','${pass}')`)
                        db.query(`INSERT INTO user (ID,username,password) VALUES(0,'${user}','${md5_2(pass)}')`,(err,data)=>{
                            if(err){
                                console.log('regInsert'+err)
                                res.write('{"err":1,"msg":"database error "}');
                                res.end();
                            }else{
                                res.write('{"err":0,"msg":"success "}');
                                res.end();
                            }
                        })
                    }
                })
            }
        break;
        case '/login':
            //校验
            if(!user){
                res.write('{"err":1,"msg":"please input username "}');
                res.end();
            }else if(!pass){
                res.write('{"err":1,"msg":"please input password "}');
                res.end();
            }else if(!/^\w{4,16}$/.test(user)){
                res.write('{"err":1,"msg":"username is invalid "}');
                res.end();
            }else if(/['|"]/.test(pass)){  //存在' " ,就报错误信息
                res.write('{"err":1,"msg":"password is invalid "}');
                res.end();
            }else{
                db.query(`SELECT * FROM user WHERE username='${user}'`,(err,data)=>{
                    if(err){
                        res.write('{"err":1,"msg":"database error "}');
                        res.end();
                    }else if(data.length==0){
                        res.write('{"err":1,"msg":"no this. username "}');
                        res.end();
                    }else if(data[0].password!=md5_2(pass)){
                        res.write('{"err":1,"msg":"username/password is incorrect"}');
                        res.end();
                    }else{
                        res.write('{"err":0,"msg":"success "}');
                        res.end();
                    }
                })
            }
        break;
        default:
            let rs=fs.createReadStream(`www${req.url}`);
            res.setHeader('content-encoding','gzip');
            let gz=zlib.createGzip();
            rs.pipe(gz).pipe(res);
            rs.on('error',err=>{
                res.writeHeader(404);
                res.write('Not Found');
                res.end();
            })
    }
})
server.listen(8081);