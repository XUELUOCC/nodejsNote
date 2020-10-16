const http=require('http');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');
const zlib=require('zlib');

let server=http.createServer((req,res)=>{

   let {pathname}=url.parse(req.url);

   //获取文件信息，日期等
   fs.stat(`www${pathname}`,(err,stat)=>{
       if(err){
            res.writeHeader(404); 
            res.write('404');
            console.log('读取失败');
            res.end();
        }else{
            // console.log(stat)
            if(req.headers['if-modified-since']){
                let oDate=new Date(req.headers['if-modified-since']);
                let time_client=Math.floor(oDate.getTime()/1000);  //客户端时间
                let time_server=Math.floor(stat.mtime.getTime()/1000); //服务端时间
                console.log( time_client,time_server)
                if(time_server>time_client){  //服务端的版本比较新，客户端的版本比较旧
                    sendFile();
                    // res.writeHeader(304);
                }else{
                    console.log('版本一致')
                    res.writeHeader(304);
                    res.write('Not Modified');
                    res.end();
                }
            }else{
                sendFile();
            }

            //发送
            function sendFile(){
                let rs=fs.createReadStream(`www${pathname}`);
                res.setHeader('Last-Modified',stat.mtime.toGMTString())

                //输出
                rs.pipe(res);
                rs.on('error',err=>{
                    res.writeHeader(404);  //writeHeader()---书写完后直接结束，发过去   setHeader()---设置头部，并不会直接结束
                    res.write('No Found');
                    res.end();
                })
            }
          
       }
   })
})

server.listen(8080);