const http=require('http');
const fs=require('fs');
const url=require('url');
const zlib=require('zlib');

let server=http.createServer((req,res)=>{
    let {pathname}=url.parse(req.url);

    fs.stat(`file${pathname}`,(err,stat)=>{
        if(err){
            res.writeHeader(404);
            res.write('404');
            res.end();
        }else{
            if(req.headers['if-modified-since']){
                // console.log(req.headers['if-modified-since'])
                let oDate=new Date(req.headers['if-modified-since']);
                let date_client=Math.floor(oDate.getTime()/1000) ;  //客户端时间
                let date_server=Math.floor(stat.mtime.getTime()/1000);
                console.log(date_client,date_server);
                if(date_server>date_client){
                    console.log('服务器版本较新，需要进行重新加载')
                    sendFile();
                }else{
                    console.log('版本没变化，基本一致');
                    res.writeHeader(304);
                    res.write('从缓存中取');
                    res.end();
                }         
            }else{
                sendFile();
            }
            //重新加载文件
            function sendFile(){
                let rs=fs.createReadStream(`file/${pathname}`);
                res.setHeader('Last-Modified',stat.mtime.toGMTString());  //服务端重新将时间传给客户端
                rs.pipe(res);  //流操作
                res.on('error',err=>{
                    res.writeHeader(404);
                    res.write('文件加载失败');
                    res.end();
                })
            }
        }
    })
})

server.listen(8088);