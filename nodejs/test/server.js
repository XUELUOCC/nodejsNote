const koa=require('koa');
const betterBody=require('koa-better-body');
const convert=require('koa-convert');
const router=require('koa-router')();
const pathlib=require('path');

let server=new koa();
server.listen(3000);

server.use(convert(betterBody({
    uploadDir:pathlib.resolve('./upload'),   //设置提交文件的保存路径
    keepExtensions:true   //设置是否保存上传文件的拓展名
})))

//引入子路由模块
let list=require('./routes/list');
let add=require('./routes/add');

//配置子路由
router.use('/api',list.routes())

//启动路由
server.use(router.routes()).use(router.allowedMethods());