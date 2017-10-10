// 原生构造函数的继承

// ES6 允许继承原生构造函数定义子类
// 这意味着，ES6 可以自定义原生数据结构（比如Array、String等）的子类，这是 ES5 无法做到的

class VersionedArray extends Array {
  constructor() {
    super();
    this.history = [[]];
  }
  commit() {
    this.history.push(this.slice());
  }
  revert() {
    this.splice(0, this.length, ...this.history[this.history.length - 1]);
  }
  methodTest() {
    console.log('hello world');
  }
}

const x = new VersionedArray();

x.push(1);
x.push(2);
console.log(x); // [1, 2]
console.log(x.history); // [[]]

// x.methodTest(); // 报错？ not a function

// x.commit();
// console.log(x.history); // [[], [1, 2]]

// x.push(3);
// console.log(x); // [1, 2, 3]
// console.log(x.history); // [[], [1, 2]]

// x.revert();
// console.log(x); // [1, 2]

// 注意，继承Object的子类，有一个行为差异。(不太懂哎？？)
// http://es6.ruanyifeng.com/#docs/class-extends

class NewObj extends Object{
  constructor(){
    super(...arguments);
  }
}

const o = new NewObj({attr: true});
console.log(o.attr === true); // true ?? 与教程不符啊
console.log(o.attr); // true ?? 与教程不符啊

// Mixin 模式 ？？ 懵懵的，回头看看
