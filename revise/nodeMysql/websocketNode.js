const http=require('http');
const io=require('socket.io')();

let httpServer=http.createServer()
 //浏览器通过http服务器来查找连接websocket
let wsServer=io.attach(httpServer);
wsServer.on('connection',sock=>{  //监听wsServer的连接
    // sock.emit()//发送
    // sock.on()//接收
    console.log('ggggg')
    sock.on('aaa',function(a,b,c){  //接收前端传过来的数据 ，接收事件为aaa,接收参数a,b,c
        console.log(a,b,c)
    })
    sock.emit('t',new Date().getTime());//发送信息给客户端
})

httpServer.listen(8081,function(){
    console.log('接口8081')
});
