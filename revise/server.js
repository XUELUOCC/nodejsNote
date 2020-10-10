const http=require('http');

let server=http.createServer(function(req,res){
    console.log(req.method,req.url);
    // console.log(res)
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    // res.write('响应报文');
    switch(req.url){
        case '/login':
            res.write('登录接口');
            break;
        case '/register':
            res.write('注册接口');
            break;
        case '/1.html':
            res.write('请求的页面');
            break;
    }
    if(req.url=='/favicon.ico'){
        res.writeHeader(404);
        res.end();
    }
    res.end();
})
server.listen(8088);