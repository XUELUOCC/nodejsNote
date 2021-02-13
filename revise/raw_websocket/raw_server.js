const http=require('http');
const net=require('net');    //nodejs中提供TCP协议的模块，相当于node中的原生socket
const crypto=require('crypto');

// let httpServer=http.createServer((req,res)=>{   //通过http访问ws服务器，websocket,连接失败
//     console.log('连接')                   //因为http服务器只能处理http协议的请求，ws请求处理不了
// })
// httpServer.listen(8080);

let netServer=net.createServer( sock=>{
    console.log('连接')
    sock.once('data',data=>{  //监听data事件，表示有数据过来---握手过程,只有一次
        // console.log(data.toString()) //数据过来后，必须先通过http协议，所以先过来的是http的头部
        let str=data.toString();

        //先将每一行数据变成数组,通过每一行的结尾字符分隔
        let lines=str.split('\r\n');

        //变成数组后，去掉第一行和最后两行
        lines=lines.slice(1,lines.length-2);

        //创建新的头部
        let header={};
        lines.forEach((item,index)=>{
            let [key,val]=item.split(': ');
            // console.log(key,val);
            header[key.toLowerCase()]=val;
        })
        // console.log(header)

        //判断http传过来的数据是否是websocket协议  判断header中的upgrade---- upgrade: 'websocket',判断websocket的版本是否是13，验证数据中的密钥
        if(header['upgrade']!='websocket'){
            console.log('其他协议',header['upgrade']);
            sock.end();//关闭连接
        }else if(header['sec-websocket-version']!=13){
            console.log('版本不对，处理不了');
            sock.end();//关闭连接
        }else{
            let key=header['sec-websocket-key'];
            let mask='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
            let hash=crypto.createHash('sha1');
            hash.update(key+mask);   //加密
            let key2=hash.digest('base64'); //转化成base64编码
            // console.log(key2);

            //http的key校验，协议升级
            sock.write(`HTTP/1.1 101 Switching Protocols\r\nupgrade:websocket\r\nConnection:Upgrade\r\nSec-WebSocket-Accept:
            ${key2}\r\n\r\n`);
            //握手结束
            console.log('hand shake')

            //握手结束，此时以后的所有数据皆为websocket数据
            sock.on('data',data=>{
                console.log('有数据')
                console.log(data)  //接收到的数据帧，buffer对象
            })
        }


    })
    sock.on('end',()=>{  //监听end事件，表示连接断开
        console.log('客户端已断开')
    })
})
netServer.listen(8080)