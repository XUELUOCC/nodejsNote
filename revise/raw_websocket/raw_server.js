const http=require('http');
const net=require('net');    //nodejs中提供TCP协议的模块，相当于node中的原生socket
const crypto=require('crypto');

// let httpServer=http.createServer((req,res)=>{   //通过http访问ws服务器，websocket,连接失败
//     console.log('连接')                   //因为http服务器只能处理http协议的请求，ws请求处理不了
// })
// httpServer.listen(8080);

let netServer=net.createServer(sock=>{
    console.log('连接')
})
netServer.listen(8080)