const dns=require('dns');

dns.resolve('baidu.com',(err,data)=>{
    if(err){
        console.log('解析失败')
    }else{
        console.log('解析成功')
        console.log(data)
    }
})