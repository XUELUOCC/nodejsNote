const koa=require('koa');
const betterBody=require('koa-better-body');
const convert=require('koa-convert');
const router=require('koa-router')();
const pathlib=require('path');
const sha1=require('sha1')
const koaRequest=require('koa2-request')

//微信公众号配置
const config = {
    "appID": "wxd6ae79ab82da5916",
    "appsecret": "d47c2e3a372eb5ada8bbd0961dc1aba8",
    "token": "wechat"   
}

let server=new koa();
server.listen(3000);

server.use(convert(betterBody({
    uploadDir:pathlib.resolve('./upload'),   //设置提交文件的保存路径
    keepExtensions:true   //设置是否保存上传文件的拓展名
})))

router.get('/',(ctx,next)=>{
    ctx.response.body='接口数据'
     // 获取微信服务器发送的数据
      signature = ctx.query.signature,
      timestamp = ctx.query.timestamp,
      nonce = ctx.query.nonce,
      echostr = ctx.query.echostr;
      // token、timestamp、nonce三个参数进行字典序排序
    var str = [config.token, timestamp, nonce].sort().join('');
    const sha=sha1(str)
    ctx.body=(sha===signature)? echostr +'' : 'failed'
})
koaRequest({
    timeout: 5000, // 设置超时
    method: 'GET', //请求方式
    url: 'https://api.weixin.qq.com/cgi-bin/token', //url
    qs: { //参数，注意get和post的参数设置不一样 
        grant_type: "client_credential",
        appid: config.appID,
        secret: config.appsecret
    }
 
}, function(error, response, body) {
    if(!error && response.statusCode == 200) {
        console.log(body);
        body = JSON.parse(body);
        if(body.access_token) {
            var token = body.access_token;
            setItem(token);
        }
    } else {
        console.log("error");
    }
});
var btn = {
    "button": [
        {
            "type": "click",
            "name": "测试",
            "key": "V1001_TODAY_MUSIC"
        },
        {
            "name": "菜单",
            "sub_button": [{
                    "type": "view",
                    "name": "测试1",
                    "url": "http://192.168.1.104:8080"
            },
            {
                    "type": "click",
                    "name": "测试2",
                    "key": "V1001_GOOD"
                }
            ]
        }
    ]
}
function setItem(token) {　
    koaRequest({
        timeout: 5000, // 设置超时
        method: 'POST', //请求方式
        url: 'https://api.weixin.qq.com/cgi-bin/menu/create?access_token=' + token, //url
        headers: {
             'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:  JSON.stringify(btn)
        }, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            console.log(body);
                 
        } else {
            console.log("error");
        }
    });
}


//引入子路由模块
let list=require('./routes/list');
let add=require('./routes/add');

//配置子路由
router.use('/api',list.routes())

//启动路由
server.use(router.routes()).use(router.allowedMethods());