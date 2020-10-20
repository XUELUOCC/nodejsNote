const cluster=require('cluster');
const os=require('os');

console.log(os.cpus()); //cpu的内核数
if(cluster.isMaster){   //判断是否是主进程
    cluster.fork();  //分裂两个进程
}

console.log('abc')