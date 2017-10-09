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
