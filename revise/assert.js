const assert=require('assert');

function sum (a,b){
    assert(arguments.length==2,'必须传两个参数');  //不符合条件，将会报错且提醒‘必须传两个参数’
    return a+b;
}
sum(2,3);