const uuid=require('node-uuid');

console.log(uuid.v4())
console.log(uuid.v4().replace(/\-/g,''));