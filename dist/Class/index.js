'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
