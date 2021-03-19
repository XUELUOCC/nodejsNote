const pug=require('pug');

console.log(pug.renderFile('./template/pug/1.pug',{
    pretty:true   //编译的文件是否换行凸显结构
}))  //编译文renderFile()，，需要渲染pug代码文件的路径