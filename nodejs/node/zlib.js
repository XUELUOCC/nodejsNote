const zlib=require('zlib');
const fs=require('fs');

let rs=fs.createReadStream('www/jquery-1.12.4.js');
let ws=fs.createWriteStream('www/jquery-1.12.4.js.gz');

let gz=zlib.createGzip();  //创建一个zlib对象

//管道pipe.先流向gz,再流向ws,最后在ws的finish事件中结束
rs.pipe(gz).pipe(ws);

ws.on('finish',()=>{
    console.log('压缩完成');
})