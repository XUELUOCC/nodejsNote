const http=require('http');
const io=require('socket.io')();

let httpServer=http.createServer();
httpServer.listen(8082);

let wsServer=io.listen(httpServer);
let wsArr=[];  //连接ws的服务器数组
wsServer.on('connection',sock=>{
    //每连接一个就push进数组，同时接收到客户端的信息后，需要将信息分发到其他服务器
    //但分发下去时需要去除发送给服务端信息的客户端连接
    wsArr.push(sock);
    //每次刷新时，会重新进行连接，上一个连接已经断开，此时需要将断开的连接去除掉
    sock.on('disconnect',s=>{    
        let tip=wsArr.indexOf(s);
        if(tip!=-1){
              wsArr.splice(tip,1);
        }
    })
    sock.on('msg',str=>{
        console.log(str)
        wsArr.forEach((item,index)=>{
            if(item!=sock){
                item.emit('msg',str)
            }
        })
    });
    // sock.emit();
})

setInterval(()=>{
    console.log(wsArr.length)
},1000)

