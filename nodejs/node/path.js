const path=require('path');

let str='/var/test/local/1.png';

console.log(path.dirname(str));
console.log(path.basename(str));
console.log(path.extname(str));