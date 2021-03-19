const ejs=require('ejs');

ejs.renderFile('./template/ejs/1.html',{
    a:12,b:5,
    str:'dfgs',
    str1:'我是<strong></strong>学生'
}).then(data=>{
    console.log('渲染成功')
    console.log(data)
},err=>{
    console.log(err)
})