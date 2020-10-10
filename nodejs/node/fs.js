const fs=require('fs');

fs.readFile('1.txt',(err,data)=>{
    if(!err){
        console.log(data);
        console.log(data.toString())
        fs.writeFile('1-Child.txt',data+'1.txt的复制品',err=>{
            if(err){
                console.log('书写复制出错')
            }else{
                console.log('书写复制成功')
            }
        })
    }else{
        console.log('读取有错');
    }
})

// fs.writeFile('2.txt','归期',err=>{
//     if(err){
//         console.log('书写出错')
//     }else{
//         console.log('成功')
//     }
// })