const http=require('http');
const url=require('url');
const querystring=require('querystring');
const fs=require('fs');

let users={};  //保存的用户数据
let server=http.createServer((req,res)=>{
    let {pathname,query}=url.parse(req.url,true);
    // console.log(pathname,query)

    res.setHeader('Access-Control-Allow-Origin', '*'); //解决跨域的方式，允许所有域名都可访问

    let str='hhh1'
    req.on('data',data=>{  //接收客户端传来的数据
        str+=data;
    })

    req.on('end',()=>{  //监听客户端的数据接收完成之后的事件
        console.log(str)
        console.log('hhhh')
        let {user,pass}=query;
        switch(pathname){
            case '/register':
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
            // default:         //为了模仿在服务器调用本地文件，当服务启动后，直接访问 eg:  http://localhost:8088/1.html
                // fs.readFile((`file${pathname}`),(err,data)=>{
                //     if(err){
                //         res.writeHeader(404);  //status=404
                //         res.write('404,Not Found')
                //     }else{
                //         res.write(data);
                //     }
                //     res.end();
                // })
        }
    })

});
server.listen(8088);