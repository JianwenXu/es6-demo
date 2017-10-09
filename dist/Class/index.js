'use strict';

var _obj;

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 1.super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。

var A = function A() {
  _classCallCheck(this, A);

  console.log(new.target.name);
};

// 注意
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，
// 因此super()在这里相当于A.prototype.constructor.call(this)。


var B = function (_A) {
  _inherits(B, _A);

  function B() {
    _classCallCheck(this, B);

    return _possibleConstructorReturn(this, (B.__proto__ || Object.getPrototypeOf(B)).call(this));
  }

  return B;
}(A);

var a = new A(); // A

// const b = new B(); // 会报错 new.target是undefine,不知道啥原因？？

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

// 2.super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

var A2 = function () {
  function A2() {
    _classCallCheck(this, A2);

    this.x = 5676;
  }

  _createClass(A2, [{
    key: 'p',
    value: function p() {
      return 2;
    }

    // ES6 规定，通过super调用父类的方法时，super会绑定子类的this。

  }, {
    key: 'print',
    value: function print() {
      console.log(this.x);
    }
  }]);

  return A2;
}();

var B2 = function (_A2) {
  _inherits(B2, _A2);

  // 由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。??
  function B2() {
    _classCallCheck(this, B2);

    var _this2 = _possibleConstructorReturn(this, (B2.__proto__ || Object.getPrototypeOf(B2)).call(this));

    console.log(_get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'p', _this2).call(_this2));
    _this2.x = 999;
    _set(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'x', 888, _this2);
    // super.x赋值为888，这时等同于对this.x赋值为888。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。??
    // 测试发现依然是 999 why？？
    console.log(' this.x : ', _this2.x); // 888
    console.log(' super.x : ', _get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'x', _this2)); // undefined
    console.log(' super.valueOf() instanceof B : ', _get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'valueOf', _this2).call(_this2) instanceof B); // false ??
    console.log(' super.valueOf() instanceof A : ', _get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'valueOf', _this2).call(_this2) instanceof A); // false ??
    return _this2;
  }

  _createClass(B2, [{
    key: 'method',
    value: function method() {
      _get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'print', this).call(this);
    }
  }, {
    key: 'prop',
    get: function get() {
      // 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

      console.log(_get(B2.prototype.__proto__ || Object.getPrototypeOf(B2.prototype), 'x', this)); // undefined
    },
    set: function set(value) {
      console.log('setter : ', value);
    }
  }]);

  return B2;
}(A2);

var b2 = new B2(); // 2
b2.prop; // undefined

b2.prop = 123; //setter : 123,可是这个值存到那里去了
b2.prop123 = 123; // 没有值

// ES6 规定，通过super调用父类的方法时，super会绑定子类的this。
b2.method(); // 999

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。

var Parent = function () {
  function Parent() {
    _classCallCheck(this, Parent);
  }

  _createClass(Parent, [{
    key: 'myMethod',
    value: function myMethod(msg) {
      console.log('instance', msg);
    }
  }], [{
    key: 'myMethod',
    value: function myMethod(msg) {
      console.log('static', msg);
    }
  }]);

  return Parent;
}();

var Child = function (_Parent) {
  _inherits(Child, _Parent);

  function Child() {
    _classCallCheck(this, Child);

    return _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).apply(this, arguments));
  }

  _createClass(Child, [{
    key: 'myMethod',
    value: function myMethod(msg) {
      _get(Child.prototype.__proto__ || Object.getPrototypeOf(Child.prototype), 'myMethod', this).call(this, msg);
    }
  }], [{
    key: 'myMethod',
    value: function myMethod(msg) {
      _get(Child.__proto__ || Object.getPrototypeOf(Child), 'myMethod', this).call(this, msg);
    }
  }]);

  return Child;
}(Parent);

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

// 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

// 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

var obj = _obj = {
  toString: function toString() {
    return "MyObject: " + _get(_obj.__proto__ || Object.getPrototypeOf(_obj), 'toString', this).call(this);
  }
};

console.log(' obj.toString() : ', obj.toString()); // MyObject: [object Object]
