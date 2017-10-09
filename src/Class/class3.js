// 本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

class Point {}

// name属性总是返回紧跟在class关键字后面的类名。
console.log(' Point.name : ', Point.name); // Point

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

class MyClass {
  constructor () {}

  get prop() {
    console.log('getter');
  }

  set prop(value) {
    console.log(' setter : ', value);
  }
}

const inst = new MyClass();

inst.prop = 123; // setter : 123
console.log(' inst.prop ', inst.prop); // getter, inst.prop undefined？？

// prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。----不懂哎

const descriptor = Object.getOwnPropertyDescriptor(
  MyClass.prototype, 'prop'
);

console.log('"get" in descriptor', 'get' in descriptor); // true
console.log('"set" in descriptor', 'set' in descriptor); // false

// Class 的 Generator 方法---这个还没看，以后回过来看这一块

// 静态方法

class Foo {
  static classMethod() {
    return 'hello static method';
  }

  // 如果静态方法包含this关键字，这个this指的是类，而不是实例。

  static bar () {
    this.baz(); // 等同于调用Foo.baz
  }

  // 静态方法可以与非静态方法重名。

  static baz () {
    console.log('hello');
  }

  baz () {
    console.log('world');
  }
}

console.log(' Foo.classMethod() : ', Foo.classMethod()); // hello static method

const foo = new Foo();
// 静态方法不会被实例继承，而是直接通过类来调用
// console.log(' foo.classMethod() : ', foo.classMethod()); // 报错，因为方法不存在

Foo.bar(); // hello
foo.baz(); // world

// 父类的静态方法，可以被子类继承。

class Bar extends Foo {}

console.log(' Bar.classMethod() : ', Bar.classMethod()); // 'hello static method'

// 静态方法也是可以从super对象上调用的。

class Baz extends Foo {
  static classMethod() {
    return super.classMethod() + ', extends from Foo';
  }
}

console.log('Baz.classMethod() : ', Baz.classMethod()); // 'hello static method, extends from Foo'

// Class 的静态属性和实例属性

Foo.prop = 1;
console.log(' Foo.prop : ', Foo.prop); // 1

// 只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。

// new.target 属性
// 1.用在构造函数中，要个要求必须使用new来创建实例
// 2.可以写出不能独立使用、必须继承后才可以使用的类
// 说明：这两种情况都是使用if...else 做判断，抛异常
