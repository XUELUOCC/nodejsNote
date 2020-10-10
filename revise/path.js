const path=require('path');

let pathTest='dir/view/path/1.png';
let dir=path.dirname(pathTest);
let fileName=path.basename(pathTest);
let ext=path.extname(pathTest);
console.log(dir)
console.log(fileName)
console.log(ext)