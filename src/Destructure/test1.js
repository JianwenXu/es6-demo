// 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值。

// 数组的解构赋值

let [foo, [[bar], baz]] = [1, [[2], 3]];

console.log(foo); // 1
console.log(bar); // 2
console.log(baz); // 3

let [ , , third] = ['foo', 'bar', 'baz'];

console.log(third); // 'baz'

let [x, , y] = [1, 2, 3];

console.log(x); // 1
console.log(y); // 3

let [head, ...tail] = [1, 2, 3, 4];

console.log(head); // 1
console.log(tail); // [2, 3, 4]

let [x2, y2, ...z2] = ['a'];

// 如果解构不成功，变量的值就等于 undefined
console.log(x2); // 'a'
console.log(y2); // undefined
console.log(z2); // []

// 不完全解构(等号左边的模式，只匹配一部分的等号右边的数组)，解构依然可以成功
let [x3, y3] = [1, 2, 3];

console.log(x3); // 1
console.log(y3); // 2

let [a2, [b2], d2] = [1, [2, 3], 4];

console.log(a2); // 1
console.log(b2); // 2
console.log(d2); // 4

// 如果等号的右边不是数组（或者严格地说，不是可遍历的结构），那么将会报错。

// let [foo2] = 1; // 报错
// let [foo3] = false; // 报错
// let [foo4] = NaN; // 报错
// let [foo5] = undefined; // 报错
// let [foo6] = null; // 报错
// let [foo7] = {}; // 报错

// 对于Set解构，可以使用数组的解构赋值
let [x4, y4, z4] = new Set(['a', 'b', 'c']);

console.log(x4); // 'a'
console.log(y4); // 'b'
console.log(z4); // 'c'

// 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
// fibs是一个 Generator 函数（参见《Generator 函数》一章），原生具有 Iterator 接口。(????)
// 解构赋值会依次从这个接口获取值

// 以下代码编译之后报错
// 但是在console里面执行的结果是符合预期的
// function* fibs() {
//   let a = 0;
//   let b = 1;
//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }

// let [first1, second1, third1, fourth1, fifth1, sixth1] = fibs();
// console.log(sixth1); // 5
