//buffer类在全局作用域中，因此不依赖模块

const buffer1=Buffer.alloc(10); //创建一个长度为10的buffer
const buffer2=Buffer.alloc(12,1);//创建一个长度为12,且用0x1填充的buffer
const buffer3=Buffer.from('test'); //创建一个buffer,包含字符串 'tést' 的 UTF-8 编码字节
console.log(buffer1,buffer2,buffer3)