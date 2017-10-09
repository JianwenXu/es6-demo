'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// 本质上，ES6 的类只是 ES5 的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

var Point = function Point() {
  _classCallCheck(this, Point);
};

// name属性总是返回紧跟在class关键字后面的类名。


console.log(' Point.name : ', Point.name); // Point

// 与 ES5 一样，在“类”的内部可以使用get和set关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

var MyClass = function () {
  function MyClass() {
    _classCallCheck(this, MyClass);
  }

  _createClass(MyClass, [{
    key: 'prop',
    get: function get() {
      console.log('getter');
    },
    set: function set(value) {
      console.log(' setter : ', value);
    }
  }]);

  return MyClass;
}();

var inst = new MyClass();

inst.prop = 123; // setter : 123
console.log(' inst.prop ', inst.prop); // getter, inst.prop undefined？？

// prop属性有对应的存值函数和取值函数，因此赋值和读取行为都被自定义了。

// 存值函数和取值函数是设置在属性的 Descriptor 对象上的。----不懂哎

var descriptor = Object.getOwnPropertyDescriptor(MyClass.prototype, 'prop');

console.log('"get" in descriptor', 'get' in descriptor); // true
console.log('"set" in descriptor', 'set' in descriptor); // false

// Class 的 Generator 方法---这个还没看，以后回过来看这一块

// 静态方法

var Foo = function () {
  function Foo() {
    _classCallCheck(this, Foo);
  }

  _createClass(Foo, [{
    key: 'baz',
    value: function baz() {
      console.log('world');
    }
  }], [{
    key: 'classMethod',
    value: function classMethod() {
      return 'hello static method';
    }

    // 如果静态方法包含this关键字，这个this指的是类，而不是实例。

  }, {
    key: 'bar',
    value: function bar() {
      this.baz(); // 等同于调用Foo.baz
    }

    // 静态方法可以与非静态方法重名。

  }, {
    key: 'baz',
    value: function baz() {
      console.log('hello');
    }
  }]);

  return Foo;
}();

console.log(' Foo.classMethod() : ', Foo.classMethod()); // hello static method

var foo = new Foo();
// 静态方法不会被实例继承，而是直接通过类来调用
// console.log(' foo.classMethod() : ', foo.classMethod()); // 报错，因为方法不存在

Foo.bar(); // hello
foo.baz(); // world

// 父类的静态方法，可以被子类继承。

var Bar = function (_Foo) {
  _inherits(Bar, _Foo);

  function Bar() {
    _classCallCheck(this, Bar);

    return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).apply(this, arguments));
  }

  return Bar;
}(Foo);

console.log(' Bar.classMethod() : ', Bar.classMethod()); // 'hello static method'

// 静态方法也是可以从super对象上调用的。

var Baz = function (_Foo2) {
  _inherits(Baz, _Foo2);

  function Baz() {
    _classCallCheck(this, Baz);

    return _possibleConstructorReturn(this, (Baz.__proto__ || Object.getPrototypeOf(Baz)).apply(this, arguments));
  }

  _createClass(Baz, null, [{
    key: 'classMethod',
    value: function classMethod() {
      return _get(Baz.__proto__ || Object.getPrototypeOf(Baz), 'classMethod', this).call(this) + ', extends from Foo';
    }
  }]);

  return Baz;
}(Foo);

console.log('Baz.classMethod() : ', Baz.classMethod()); // 'hello static method, extends from Foo'

// Class 的静态属性和实例属性

Foo.prop = 1;
console.log(' Foo.prop : ', Foo.prop); // 1

// 只有这种写法可行，因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。
