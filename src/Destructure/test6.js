// 解构赋值的用途

// 1.交换变量的值

// 下面代码交换变量x和y的值，这样的写法不仅简洁，而且易读，语义非常清晰。
let x = 1;
let y = 2;

console.log(x, y); // 1, 2

[x, y] = [y, x];

console.log(x, y); // 2, 1

// 2.从函数中返回多个值

// 返回一个数组
function example1() {
  return [1, 2, 3];
}

let [a, b, c] = example1();

// 返回一个对象
function example2() {
  return {
    foo: 1,
    bar: 3
  };
}

let { foo, bar } = example2();

// 3.函数参数的定义

// 参数是一组有次序的值
function f1([x, y, z]) {
  console.log(x, y, z);
}

f1([1, 2, 3]); // 1, 2, 3

// 参数是一组无次序的值
function f2({x, y, z}) {
  console.log(x, y, z);
}

f2({z: 3, y: 2, x: 1}); // 1, 2, 3

// 4.提取JSON数据

let jsonData = {
  id: 42,
  status: "OK",
  data: [867, 5309]
};

let { id, status, data: number } = jsonData;

console.log(id, status, number); // 42, "OK", [867, 5309]

// 5.函数参数默认值

// 指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
}

// 6.遍历map结构

const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + " is " + value);
}
// first is hello
// second is world

// 只获取键名
for (let [key] of map) {
  // ...
}

// 只获取键值
for (let [,value] of map) {
  // ...
}

// 7.输入模块的指定方法

// 加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰
const { SourceMapConsumer, SourceNode } = require("source-map");
