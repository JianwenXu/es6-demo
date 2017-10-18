// 扩展运算符(...), 将一个数组转化为用逗号分隔的参数序列

console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5

// 该运算符主要用于函数调用
function push(array, ...items) {
  array.push(...items);
}

var arr1 = [1, 2, 3];
console.log(arr1); // [1, 2, 3]
push(arr1, ...[4, 5, 6, 7]);
console.log(arr1); // [1, 2, 3, 4, 5, 6, 7]

function add(x, y) {
  return x + y;
}

const numbers = [4, 38];
console.log(add(...numbers)); // 42

// 扩展运算符可以与正常的函数参数结合使用，非常灵活
function f(v, w, x, y, z) {
  // do stuff
}

const args = [0, 1];

f(-1, ...args, 2, ...[3]);

// 扩展运算符后面还可以放置表达式
let x = 0;
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b'
];

//如果扩展运算符后面是一个空数组，则不会产生任何效果
console.log([...[], 1]); // [1]
