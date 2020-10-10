const zlib=require('zlib');
const fs=require('fs');

let rs=fs.createReadStream('file/jquery-1.12.4.js');
let ws=fs.createWriteStream('file/jquery-1.12.4.js.gz');
let gz=zlib.createGzip();

rs.pipe(gz).pipe(ws);

ws.on('finish',function(){
    console.log('压缩完成')
})
