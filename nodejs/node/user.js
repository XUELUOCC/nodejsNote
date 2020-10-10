//引入模块
const http=require('http');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');

let users={};  //保存的用户数据
let server=http.createServer((req,res)=>{
    //get----注册
    let {pathname,query}=url.parse(req.url,true)
    // console.log(pathname,query)

    //post----登陆
    let str='';
    req.on('data',data=>{
        str+=data;
    })

    //   /reg?user=...&pass=...
    req.on('end',()=>{
        let objPost=querystring.parse(str);

        //登陆注册接口
        let {user,pass}=query;
        switch(pathname){
            case '/reg':  //注册
            // console.log(users)
            //let users={};
                if(!user){
                    res.write('{"err":1,"msg":"user is required"}');
                }else if(!pass){
                    res.write('{"err":1,"msg":"pass is required"}');
                }else if(!/^\w{8,32}$/.test(user)){
                    res.write('{"err":1,"msg":"invaild username"}');
                }else if(/^['|"]$/.test(pass)){  //密码不能出现' "
                    res.write('{"err":1,"msg":"invaild passward"}');
                }else if(users[user]){
                    res.write('{"err":1,"msg":"username is exsited"}');
                }else{
                    users[user]=pass;   // {"username":"1234566"}
                    console.log( users)
                    res.write('{"err":0,"msg":"success"}');
                }
                res.end();
                break;
            case '/login':
                if(!user){
                    res.write('{"err":1,"msg":"user is required"}');
                }else if(!pass){
                    res.write('{"err":1,"msg":"pass is required"}');
                }else if(!/^\w{8,32}$/.test(user)){
                    res.write('{"err":1,"msg":"invaild username"}');
                }else if(/^['|"]$/.test(pass)){  //密码不能出现' "
                    res.write('{"err":1,"msg":"invaild passward"}');
                }else if(!users[user]){
                    res.write('{"err":1,"msg":"no this username"}');
                }else if(users[user]!=pass){
                    res.write('{"err":1,"msg":"username or password is incorrect"}');
                }
                else{
                    res.write('{"err":0,"msg":"login is success"}');
                }
                res.end();
                break;
            default:
                fs.readFile((`www${pathname}`),(err,data)=>{
                    if(err){
                        res.writeHeader(404);  //status=404
                        res.write('404,Not Found')
                    }else{
                        res.write(data);
                    }
                    res.end();
                })
        }
    })
    // res.end();
})
//监听服务器，端口号
server.listen(8080)