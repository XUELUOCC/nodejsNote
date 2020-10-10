const cluster=require('cluster');

if(cluster.isMaster){
    console.log('是主进程，此时需要分裂子进程fork');
    cluster.fork(); //分裂两个子进程
}else{
    console.log('不是主进程')
}