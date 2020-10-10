const cluster=require('cluster');

if(cluster.isMaster){   //判断是否是主进程
    cluster.fork();  //分裂两个进程
}

console.log('abc')