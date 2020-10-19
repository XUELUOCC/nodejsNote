const http=require('http');
const fs=require('fs');
const url=require('url');
const queryString=require('querystring');
const common=require('./lib/common.js')

let server=http.createServer((req,res)=>{
      //get
      let {pathname,query}=url.parse(req.url,true)
      // console.log(pathname,query)

      //post
      let arr=[];
      req.on('data',data=>{  //监听数据，接受数据块，数据传递的形式是一块一块
          arr.push(data);    //保存数据
      })
      req.on('end',()=>{     //接收数据结束后，触发的事件
        // console.log(arr);    //只有接收结束后，可输出接收的数据数组
        let data=Buffer.concat(arr);
        console.log(data.toString());
        // console.log()
        let post={};  //普通数据
        let files={}; //文件数据
        console.log(req.headers)
        res.end();
      })
})

server.listen(8088)