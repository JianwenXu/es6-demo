// 数组的解构赋值
// 默认值

let [foo = true] = [];

console.log(foo); // true

let [x, y = 'b'] = ['a'];
let [x2, y2 = 'b'] = ['a', undefined];

console.log(x); // a
console.log(y); // b
console.log(x2); // a
console.log(y2); // b

// ES6 内部使用严格相等运算符（===），判断一个位置是否有值。
// 所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

let [x3 = 1] = [undefined];
let [x4 = 1] = [null];

console.log(x3); // 1
console.log(x4); // null

// 如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值

function f() {
  console.log('我不会执行');
}

let [x5 = f()] = [1];

// 默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

let [x6 = 1, y6 = x6] = [];
let [x7 = 1, y7 = x7] = [2];
let [x8 = 1, y8 = x8] = [1, 2];

console.log(x6, y6); // 1, 1
console.log(x7, y7); // 2, 2
console.log(x8, y8); // 1, 2

let [x9 = y9, y9 = 1] = [4];
console.log(x9, y9); // 4, 1

// let [x10 = y10, y10 = 1] = []; // 报错:y10未定义

