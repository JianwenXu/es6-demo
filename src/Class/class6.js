// 类的 prototype 属性和__proto__属性

// Class 作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链。
// 1.子类的__proto__属性，表示构造函数的继承，总是指向父类。
// 2.子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

class A {}

class B extends A {}

console.log(B.__proto__ === A); // true
console.log(B.prototype.__proto__ === A.prototype); // true

// 上面的代码还是有点迷迷糊糊，先记着？？

// extends 的继承目标
// extends关键字后面可以跟多种类型的值。
// 只要是一个有prototype属性的函数,就能被继承。
// 由于函数都有prototype属性（除了Function.prototype函数），因此可以是任意函数。

// 讨论三种特殊情况

// 1.子类继承 Object 类

class A2 extends Object {}

console.log(A2.__proto__ === Object); // true
console.log(A2.prototype.__proto__ === Object.prototype); // true

// 2.不存在任何继承

class A3 {}

console.log(A3.__proto__ === Function.prototype); // true
console.log(A3.__proto__ === Object); // false ??
console.log(A3.prototype.__proto__ === Object.prototype); // true

// 3.子类继承 null

class A4 extends null {}

console.log(A4.__proto__ === Function.prototype); // true
console.log(A4.__proto__ === Object); // false ??
console.log(A4.prototype.__proto__ === undefined); // true

// 实际上执行了下面的代码

// class A4 extends null {
//   constructor() {
//     return Object.create(null);
//   }
// }

// 子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__属性。
// 也就是说，子类的原型的原型，是父类的原型。

const a = new A();
const b = new B();

console.log(b.__proto__ === a.__proto__); // false
console.log(b.__proto__.__proto__ === a.__proto__); // true

// 通过子类实例的__proto__.__proto__属性，可以修改父类实例的行为。

