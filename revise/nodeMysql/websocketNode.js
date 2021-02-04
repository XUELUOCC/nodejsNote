const http=require('http');
const io=require('socket.io')(http);

let httpServer=http.createServer();
httpServer.listen(8081);

 //浏览器通过http服务器来查找连接websocket
console.log('fffff'+io)
// let wsServer=io.listen(httpServer);
io.on('connection',sock=>{  //监听wsServer的连接
    // sock.emit()//发送
    // sock.on()//接收

    sock.on('aaa',function(a,b,c){  //接收前端传过来的数据 ，接收事件为aaa,接收参数a,b,c
        console.log(a,b,c)
    })
})
