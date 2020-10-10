const events=require('events');

let ev=new events();

ev.on('msg',function(a,b){  //z\注册监听器
    console.log('接收到msg事件'+a+b)
    return a+b;
})

ev.emit('msg',1,2)  //触发事件