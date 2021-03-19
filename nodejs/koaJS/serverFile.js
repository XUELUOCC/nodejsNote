const koa=require('koa');
const static=require('koa-static');
const staticCache=require('koa-static-cache');
const path=require('path');

let server=new koa();
server.listen(8080);

// server.use(static(path.resolve('./www')))
server.use(staticCache(path.resolve('./www')))


