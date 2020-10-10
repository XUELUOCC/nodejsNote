const http=require('http');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');
const zlib=require('zlib');

let server=http.createServer((req,res)=>{
    //流操作的读取文件
    let rs=fs.createReadStream(`www${req.url}`);

    // 将文件进行压缩后再进行传输
    res.setHeader('content-encoding','gzip');
    let gz=zlib.createGzip();
    rs.pipe(gz).pipe(res)

    //读取出错---favicon.icon的请求
    rs.on('error',err=>{
        res.writeHeader(404);
        res.write('Not Found');
        res.end();
    })

    //普通的文件读取
    // fs.readFile(`www${req.url}`,(err,data)=>{
    //     if(!err){
    //         console.log('读取成功')
    //         res.write(data)
    //     }else{
    //         res.writeHeader(404); 
    //         res.write('404');
    //         console.log('读取失败')
    //     }
    //     res.end();
    // })
})

server.listen(8080);