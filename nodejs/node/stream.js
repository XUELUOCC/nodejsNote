const fs=require('fs');

let rs=fs.createReadStream('1.txt');  //创建一个读取流

let ws=fs.createWriteStream('1-stream.txt');  //创建了一个写入流

rs.pipe(ws);