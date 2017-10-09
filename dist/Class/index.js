'use strict';

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

// 对比：
// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

var Point = function () {
  function Point(x, y) {
    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: 'toString',
    value: function toString() {
      return '(' + this.x + ', ' + this.y + ')';
    }
  }]);

  return Point;
}();

// super关键字表示父类的构造函数，用来新建父类的this对象。

var ColorPoint = function (_Point) {
  _inherits(ColorPoint, _Point);

  function ColorPoint(x, y, color) {
    _classCallCheck(this, ColorPoint);

    var _this = _possibleConstructorReturn(this, (ColorPoint.__proto__ || Object.getPrototypeOf(ColorPoint)).call(this, x, y));

    _this.color = color;
    return _this;
  }

  _createClass(ColorPoint, [{
    key: 'toString',
    value: function toString() {
      return this.color + ' ' + _get(ColorPoint.prototype.__proto__ || Object.getPrototypeOf(ColorPoint.prototype), 'toString', this).call(this);
    }
  }]);

  return ColorPoint;
}(Point);

// 如果使用this的话，子类必须在constructor方法中调用super方法，且super的调用放在this出现之前，否则新建实例时会报错。
// 这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。

// 报错
// class ColorPoint2 extends Point {
//   constructor(color) {
//     this.color = color;
//   }
//   toString() {
//     return `color test`;
//   }
// }

// 报错
// class ColorPoint3 extends Point {
//   constructor() {}
// }

// 不报错
// 因为当子类没有定义constructor方法时，这个方法会被默认添加


var ColorPoint4 = function (_Point2) {
  _inherits(ColorPoint4, _Point2);

  function ColorPoint4() {
    _classCallCheck(this, ColorPoint4);

    return _possibleConstructorReturn(this, (ColorPoint4.__proto__ || Object.getPrototypeOf(ColorPoint4)).apply(this, arguments));
  }

  return ColorPoint4;
}(Point);

// ColorPoint4 和 ColorPoint5 是等价的


var ColorPoint5 = function (_Point3) {
  _inherits(ColorPoint5, _Point3);

  function ColorPoint5() {
    var _ref;

    _classCallCheck(this, ColorPoint5);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(this, (_ref = ColorPoint5.__proto__ || Object.getPrototypeOf(ColorPoint5)).call.apply(_ref, [this].concat(args)));
  }

  return ColorPoint5;
}(Point);

var cp1 = new ColorPoint(1, 2, 'red');
console.log(' cp1.toString() : ', cp1.toString());
console.log(' cp1 instanceof ColorPoint : ', cp1 instanceof ColorPoint); // true
console.log(' cp1 instanceof Point : ', cp1 instanceof Point); // true

// const cp2 = new ColorPoint2();
// console.log(' cp2.toString() : ', cp2.toString());

// const cp3 = new ColorPoint3();

var cp4 = new ColorPoint4();

var cp5 = new ColorPoint5();

// Object.getPrototypeOf方法可以用来从子类上获取父类。
// 因此，可以使用这个方法判断，一个类是否继承了另一个类。

console.log(' Object.getPrototypeOf(ColorPoint) === Point : ', Object.getPrototypeOf(ColorPoint) === Point); // true
