//引入模块
const http=require('http');
const fs=require('fs');
const url=require('url');
const querystring=require('querystring');
const common=require('./lib/common.js');
const uuid=require('uuid');

let server=http.createServer((req,res)=>{
    //get
    let {pathname,query}=url.parse(req.url,true)
    // console.log(pathname,query)

    //post
    let str='';
    let arr=[];  //保存传过来的数据，
    req.on('data',data=>{
        // console.log(str)
        // str+=data;    //当传过来的是二进制的图片时，那么str将会输出乱码，因为二进制数据并不能打印出来
        arr.push(data);
    })

    req.on('end',()=>{
        // console.log(str)
        // console.log(arr)
        let data=Buffer.concat(arr);  //将所有的buffer对象数据串成一个
        let post={};  //存放普通数据
        let files={}; //存放文件数据
        // console.log(data);
        console.log(req.headers);   //包含头部的所有信息，其中的分隔符就是content-type的内容
        // console.log(req.headers['content-type'])
        // console.log(req.headers['content-type'].split(';')[1]);  //会报错，因为favicon.icon也将会请求一次，但它是一个空的buffer,所以会报错
        if(req.headers['content-type']){
             let str=req.headers['content-type'].split('; ')[1];
             if(str){
                 let boundary='--'+str.split('=')[1];
                 console.log(boundary)
                //处理数据data
                //1.分隔符切割
                let arr=data.split(boundary);
                // console.log(arr)
                //2.丢弃首尾
                arr.shift();
                arr.pop();
                // console.log(arr)
                //3.删除每个数据头部尾部的\r\n
                arr=arr.map(buffer=>buffer.slice(2,buffer.length-2))  //[1,23,3,4,56,6]
                console.log(arr,'1111111')
                // console.log(arr.map(b=>b.toString()))
                //4.每个数据在\r\n\r\n切除两半
                arr.forEach(buffer=>{
                    let n=buffer.indexOf('\r\n\r\n');
                    let disposition=buffer.slice(0,n); //数据描述
                    let content=buffer.slice(n+4);  //数据值
                    disposition=disposition.toString();
                    console.log(disposition.toString())
                    console.log(content.toString())
                    if(disposition.indexOf('\r\n')==-1){  //表示没有\r\n
                        /* 
                        Content-Disposition: form-data; name="user"   数据描述
                        cc                                            数据值
                        */
                        // console.log('普通数据')
                        content=content.toString();
                        let name=disposition.split('; ')[1].split('=')[1];
                        name=name.substring(1,name.length-1);  //去掉""
                        // console.log(name)
                        post[name]=content;   //  psd:123456
                    }else{
                        /*
                        Content-Disposition: form-data; name="f1"; filename="1.txt"\r\n
                        Content-Type: text/plain
                        ....
                        */
                        // console.log('文件数据')
                        let [line1,line2]=disposition.split('\r\n');
                        let [,name,filename]=line1.split('; ');
                        let type=line2.split(': ')[1];

                        name=name.split('=')[1];
                        name=name.substring(1,name.length-1);

                        filename=filename.split('=')[1];
                        filename=filename.substring(1,filename.length-1);

                        console.log(name,filename,type);
                        console.log(content)

                        //处理文件内容,将上传的内容存在后台中的某个文件中，但书写文件名必须保证不能重复，否则书写后万一用户的文件名也和定义的一样
                        // 使用uuid
                        let path=`upload/${uuid.v4().replace(/\-/g,'')}`
                        fs.writeFile(path,content,err=>{
                            if(err){
                                console.log('文件写入失败')
                            }else{
                                console.log('文件写入成功')
                                files[name]={filename,path,type};
                                console.log(files)
                            }
                        })

                    }
                });
                console.log(post)
             }
        }
       

        res.end();
    })
})
//监听服务器，端口号
server.listen(8080)


/*
            //<分隔符>\r\n数据描述\r\n\r\n数据值\r\n
             //<分隔符>\r\n数据描述\r\n\r\n数据值\r\n
              //<分隔符>\r\n数据描述\r\n\r\n数据值\r\n
            //得到数据：1.通过分隔符切开数据，得到数组，其中第一个是一个空的buffer,最后一个是--，中间是数据
            //2.丢弃头收尾元素  3.丢弃每一项的头尾\r\n  4.用第一次出现的\r\n进行切分  5.判断是普通数据还是文件数据
            //普通数据：[数据描述，数据值]  文件数据：[数据描述1\r\n数据描述2，数据值]   通过判断数据描述中是否存在\r\n
         [
             null,
            \r\n数据描述\r\n\r\n数据值\r\n,
             \r\n数据描述\r\n\r\n数据值\r\n,
             \r\n数据描述1 \r\n 数据描述2     \r\n\r\n文件内容\r\n,  //上传的文件
             --
         ]
         */ 