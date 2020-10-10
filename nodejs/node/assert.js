const assert=require('assert');

function sum(a,b){
    assert(arguments.length==2,'必须传两个参数');
    return a+b;
}
console.log(sum(2,3))