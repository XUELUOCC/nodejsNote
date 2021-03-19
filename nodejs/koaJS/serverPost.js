const koa=require('koa');
const betterBody=require('koa-better-body');
const convert=require('koa-convert');
const pathilb=require('path');

let server=new koa();
server.listen(8080);

server.use(convert(betterBody({
    uploadDir:pathilb.resolve('./upload'),  //提交文件后保存的路径
    keepExtensions:true  //保留上传文件的路径
})));  //使用中间件

server.use(async(ctx,next)=>{
    console.log(ctx.request.fields);  //获取提交的普通数据+文件基本信息
    console.log(ctx.request.files)  //获取文件数据
})