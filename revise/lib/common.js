//Buffer的查找，截取,切分等操作
let b=new Buffer('aaa--bbb--ccc');

console.log(b.indexOf('--'));

console.log(b.slice(0,3).toString());


//切分
Buffer.prototype.split=Buffer.split|| function(b){  //b  需要通过切分的分隔符
    let arr=[];
    let cur=0;  //当前位置
    let n=0;  //发现分隔符的位置
    while((n=this.indexOf(b,cur))!=-1){  //=-1说明没找到b  ---查找分隔符b
        arr.push(this.slice(cur,n));  //找到每一个分隔符前的字符
        cur=n+b.length;
    }
    arr.push(this.slice(cur));
    return arr;
}
let arr=b.split('--')
// console.log(arr);
console.log(arr.map(buffer=>buffer.toString()))