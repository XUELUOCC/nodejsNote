const fs=require('fs');

fs.readFile('1.txt',(err,data)=>{
    if(err){
        console.log('阅读出错')
        // console.log(JSON.stringify(err));
    }else{
        console.log(data);//输出的二进制的数据,需要进行转化
        console.log(data.toString())
        fs.writeFile('2.txt',data.toString()+'2.txt',err=>{
            if(!err){
                console.log('书写复制成功')
            }else{
                console.log('书写复制失败')
            }
        })
    }
})