//引入模块
const http=require('http');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');

//创建服务器
let server=http.createServer((request,response)=>{
    //request  请求  接收到的数据   方法   request.method请求方式Get Post   request.url请求的地址 
    //response   响应   发送出去的数据  方法  response.write()写  response.end()表示发送的数据已发完，否则浏览器会以为没发完
    // console.log(request.method);
    // console.log(request.url);
    
    // response.write('aaaasss');
    // console.log('有人访问')
    //最初的修改
    // switch(request.url){
    //     case '/aaa':
    //         response.write('aaa');
    //         break;
    //     case '/bbb':
    //         response.write('bbb');
    //         break;
    //     case '/ccc':
    //         response.write('ccc');
    //         break;
    //     case '/1.html':
    //         response.write('<html><head><body>html页面</body></head></html>')
    // }
    // response.end();

    //二次修改
    // fs.readFile(`www${request.url}`,(err,data)=>{   //readFile是一个异步操作，即遇到判断时并不会等，会向下执行，当判断出来时就执行  www/1.html
    //     if(err){
    //         console.log('a')
    //         response.writeHeader(404);  //给机器看，设置header
    //         response.write('404');
    //     }else{
    //         console.log('b')
    //         response.write(data)
    //     }
    //     response.end();
    // })

    // //数据交互
    //     //get
    console.log(request.url);
    let {pathname,query}=url.parse(request.url,true)
    console.log(pathname,query)
    // response.end();

    //post
        //监听第一个包到达时的事件，每到一个数据包就触发一次
    let str=''; //设置每到一个数据包就将文件数据保存在一个变量中，直到完成就会得到整个数据
    request.on('data',data=>{
        str+=data;
    })
        //监听结束时的事件,解析传过来的数据
         //登陆注册接口
    let users={};  //保存的用户数据
    request.on('end',()=>{
        let objPost=querystring.parse(str);
        console.log(str,objPost)

        // //登陆注册接口
        // switch(pathname){
        //     case '/reg':
        //         break;
        //     case '/login':
        //         break;
        //     default:
        //         fs.readFile((`www${pathname}`),(err,data)=>{
        //             if(err){
        //                 response.writeHeader(404);
        //                 response.write('404,Not Found')
        //             }else{
        //                 response.write(data);
        //             }
        //             response.end();
        //         })
        // }
    })
    response.end();
})

//监听服务器，端口号
server.listen(8088)
