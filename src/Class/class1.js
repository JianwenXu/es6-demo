class Point {

  // tips:
  // 1.定义类的方法的时候，前面不需要加上 function 这个关键字，直接把函数定义放进去就行
  // 2.方法之间不需要逗号分隔，加了会报错
  // 3.类的内部所有定义的方法，嗾使不可枚举的 ( 这一点与 ES5 是不同的 )

  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

// 类的数据结构就是函数，类本身就指向构造函数

console.log('typeof Point : ', typeof Point); // function
console.log('Point === Point.prototype.constructor : ', Point === Point.prototype.constructor); // true

// 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

const point = new Point(1, 2);

console.log(' point.toString() : ', point.toString()); // (1, 2)

console.log(' point.hasOwnProperty("x") : ', point.hasOwnProperty('x')); // true
console.log(' point.hasOwnProperty("y") : ', point.hasOwnProperty('y')); // true
console.log(' point.hasOwnProperty("toString") : ', point.hasOwnProperty('toString')); // false
console.log(' point.__proto__.hasOwnProperty("toString") : ', point.__proto__.hasOwnProperty('toString')); // true

// 与 ES5 一样，类的所有实例共享一个原型对象
const point2 = new Point(2, 3);

console.log(' point.__proto__ === point2.__proto__ : ', point.__proto__ === point2.__proto__); // true

// 这也意味着，可以通过实例的__proto__属性为“类”添加方法。但是不推荐这个做

// 说明：
// __proto__ 并不是语言本身的特性，这是各大厂商具体实现时添加的私有属性，
// 虽然目前很多现代浏览器的JS引擎中都提供了这个私有属性，但依旧不建议在生产中使用该属性，避免对环境产生依赖。
// 生产环境中，我们可以使用 Object.getPrototypeOf 方法来获取实例对象的原型，然后再来为原型添加方法/属性。

// 使用的时候，也是直接对类使用 new 命令，跟构造函数的用法完全一致

// constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。
// 一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

class Bar {
  doStuff () {
    console.log('stuff');
  }
}

// 以上类的定义等价于以下代码

// class Bar {
//   constructor () {}
//
//   doStuff () {
//     console.log('stuff');
//   }
// }

const b = new Bar();
b.doStuff(); // stuff

// 类的属性名，可以采用表达式

const methodName = 'getArea'

class Square {
  constructor (x) {
    this.x = x;
  }

  [methodName] () {
    return this.x * this.x;
  }
}

const s = new Square(4);
console.log(' s.getArea() ', s.getArea()); // 16

// constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

class Foo {
  constructor () {
    return Object.create(null);
  }
}

console.log(' new Foo() instanceof Foo : ', new Foo instanceof Foo); // false

// 类必须使用new调用，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用new也可以执行。

// 与函数一样，类也可以使用表达式的形式定义。

// 需要注意的是，这个类的名字是MyClass而不是Me，Me只在 Class 的内部代码可用，指代当前类。
// 如果类的内部没用到的话，可以省略Me
const MyClass = class Me {
  getClassName () {
    return Me.name;
  }
}

const inst = new MyClass();
console.log(' inst.getClassName() : ', inst.getClassName()); // Me
// console.log(' Me.name : ', Me.name); // 报错

// 采用 Class 表达式，可以写出立即执行的 Class。

const person = new class {
  constructor (name) {
    this.name = name;
  }

  sayName () {
    return this.name;
  }
}('张三');

console.log(' person.sayName() : ', person.sayName()); // 张三

// 类不存在变量提升，所以必须保证子类在父类之后定义

// 私有属性和私有方法，ES6 不支持，智能通过变通方法模拟实现
