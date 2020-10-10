//Buffer的查找，截取,切分等操作
let b=new Buffer('aaa--bbb--ccc');

//查找indexOf
console.log(b.indexOf('--'))

//截取slice,不包含结尾项
console.log(b.slice(0,5).toString())  
console.log(b.toString())

//切分
Buffer.prototype.splite=Buffer.splite|| function(b){  //b  需要通过切分的分隔符
    let arr=[];
    let cur=0;  //当前位置
    let n=0;  //发现分隔符的位置
    while((n=this.indexOf(b,cur))!=-1){  //=-1说明已经找完了,到达最后一段  ---查找分隔符b
        arr.push(this.slice(cur,n));
        cur=n+b.length;
    }
    arr.push(this.slice(cur));
    return arr;
}
let arr=b.splite('--')
console.log(arr);
console.log(arr.map(buffer=>buffer.toString()))