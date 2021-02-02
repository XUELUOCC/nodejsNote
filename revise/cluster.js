const cluster=require('cluster');
const os=require('os');
const http=require('http');
const process=require('process') //当前进程的信息模块

if(cluster.isMaster){
    for(let i=0;i<os.cpus().length;i++){
        cluster.fork(); //分裂成子进程，充分利用cpu内核
    }
    console.log('主进程');
}else{
    let server=http.createServer((req,res)=>{
        console.log(process.pid)
        res.write('aaaa');
        res.end();
    })
    server.listen(8080)
    console.log('服务器已经开好了')//父子之间共享一个端口，共享句柄
}