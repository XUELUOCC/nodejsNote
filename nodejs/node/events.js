const Event=require('events');

let ev=new Event();

//监听(接收)
ev.on('msg',function(a,b,c){   //接收msg事件
    console.log('收到msg事件',a,b,c)
})

//发送(派发)  
ev.emit('msg',12,3,4);  //触发msg事件