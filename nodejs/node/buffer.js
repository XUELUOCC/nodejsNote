let a=new Buffer('abc');
let b=new Buffer('def');

let c=Buffer.concat([a,b]);  //将多个buffer对象串成一个大buffer
console.log(c);