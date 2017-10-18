// 字符串的解构赋值

// 字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。
const [a, b, c, d, e] = 'hello';

console.log(a); // h
console.log(b); // e
console.log(c); // l
console.log(d); // l
console.log(e); // o

let { length: len } = 'hello';

console.log(len); // 5

// 数值和布尔值的解构赋值
// 解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

let { toString: s1 } = 123;
let { toString: s2 } = true;

console.log(s1 === Number.prototype.toString); // true
console.log(s2 === Boolean.prototype.toString); // true

// 解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。
// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
// let { prop: x } = undefined; // 报错
// let { prop: x } = null; // 报错

// 函数参数的解构赋值

function add ([x, y]) {
  return x + y;
}

console.log(add([1, 2])); // 3
// ??
// 上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。
// 对于函数内部的代码来说，它们能感受到的参数就是x和y。

console.log([[1, 2], [3, 4]].map(([a, b]) => a + b)); // [3, 7]

// 函数的解构也可以使用默认值，
// !!!!这个时候要区分函数本身的默认值和解构赋值的默认值

// 解构的默认值是 0,0
// 函数的默认值是 {}
function move1({ x = 0, y = 0} = {}) {
  console.log(x, y);
}

// 只要参数有值，就不会触发 {}
move1({ x: 3, y: 8 }); // 3, 8
move1({ x: 3 }); // 3, 0
move1({}); // 0, 0
// 没有参数，触发{}
move1(); // 0, 0

function move2({ x, y } = { x: 0, y: 0 }){
  console.log(x, y);
}

// 有参数，不会用{ x: 0, y: 0 }
move2({ x: 3, y: 8 }); // 3, 8
move2({ x: 3 }); // 3, undefined
move2({}); // undefined, undefined
move2(); // 0, 0

// undefined就会触发函数参数的默认值。
console.log([1, undefined, 3].map((x = 'yes') => x)); // [1, 'yes', 3]
