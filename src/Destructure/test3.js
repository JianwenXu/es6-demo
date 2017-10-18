// 对象的解构赋值

// 对象的解构与数组有一个重要的不同。
// 数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };

console.log(foo, bar); // aaa, bbb

let { bar2, foo2 } = { foo2: 'ccc', bar2: 'ddd' };

console.log(foo2, bar2); // ccc, ddd

let { baz } = { foo: 'aaa', bar: 'bbb' };

console.log(baz); // undefined

// 如果变量名与属性名不一致，必须写成下面这样。

let { foo3: baz3 } = { foo3: 'aaa', bar3: 'bbb' };

// console.log(foo3); // 报错:foo3未定义
console.log(baz3); // aaa

let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;

console.log(f, l); // hello, world

// 这实际上说明，对象的解构赋值是下面形式的简写
// let { foo: foo, bar: bar } = { foo: "aaa", bar: "bbb" };
// 也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。
// 真正被赋值的是后者，而不是前者。

// 与数组一样，解构也可以用于嵌套结构的对象。
let obj2 = {
  p: [
    'hello',
    { y:'world' }
  ]
};

let { p: [x, { y }] } = obj2;
console.log(x, y); // hello, world

let {p2, p2: [x2, {y2}]} = {
  p2: [
    'hello',
    { y2:'world' }
  ]
};

console.log(x2, y2, p2); // hello, world, ['hello', {y: 'world'}];

// 另外一个例子
const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

let { loc, loc: { start }, loc: { start: { line }} } = node;
console.log(line, loc, start); // 1, {start: Object}, {line: 1, column: 5}

// 嵌套赋值的例子
let obj4 = {};
let arr4 = [];

({ foo: obj4.prop, bar: arr4[0] } = { foo: 123, bar: true });
// { foo: obj4.prop, bar: arr4[0] } = { foo: 123, bar: true }; // 报错

console.log(obj4, arr4); // {prop: 123}, [true]

// 对象的解构也可以指定默认值

let {x3 = 3} = {};
let {x4, y4 = 5} = {x4: 1};
let {x: y5 = 3} = {};
let {x: y6 = 3} = {x: 5};
let { message: msg = 'Something went wrong' } = {};

console.log(x3); // 3
console.log(x4, y4); // 1, 5
console.log(y5); // 3
console.log(y6); // 5
console.log(msg); // 'Something went wrong'

// 默认值生效的条件是，对象的属性值严格等于undefined。

let { x7 = 3 } = { x7: undefined };
let { x8 = 3 } = { x8: null };

console.log(x7); // 3
console.log(x8); // null

// 解构失败
let { foo4 } = { bar: 'baz' };

console.log(foo4); // undefined

// 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

// 如果要将一个已经声明的变量用于解构赋值，必须非常小心。
let x9;
// { x9 } = { x9: 2333 }; // 报错
// 只有不将大括号写在行首，避免 JavaScript 将其解释为代码块，才能解决这个问题
({ x9 } = { x9: 2333 });

console.log(x9); // 2333

// 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式
// 这些表达式虽然毫无意义，但是语法是合法的，可以执行

// 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。
let { log, cos, sin } = Math;

// 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构。
// 方括号这种写法，属于“属性名表达式”，参见《对象的扩展》一章。

let arr = [ 1, 2, 3, 4, 5 ];
let { 0: first, [arr.length - 1]: last } = arr;

console.log(first, last); // 1, 5

