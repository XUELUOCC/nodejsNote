const express=require('express');
const cookieSession=require('cookie-session');

let server=express();
server.listen(8080);

server.use(cookieSession({
    keys:['dsvfadsfva','asdgffbs'],   //添加key值，增强session的安全性--方法1
    // secret:'adfvdaf'                //添加key值，增强session的安全性--方法2
}))

server.get('/a',(req,res,next)=>{
    // console.log(req.session)
    if(!req.session['count']){
        req.session.count=1;
    }else{
        req.session.count++;
    }
    res.send(`欢迎您${req.session.count}来访`)
    console.log()
    res.end();
})