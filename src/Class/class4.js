// Class 可以通过extends关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

// 对比：
// ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。
// ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
}

// super关键字表示父类的构造函数，用来新建父类的this对象。

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y);
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString();
  }
}

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
class ColorPoint4 extends Point {}

// ColorPoint4 和 ColorPoint5 是等价的
class ColorPoint5 extends Point {
  constructor(...args) {
    super(...args);
  }
}

const cp1 = new ColorPoint(1, 2, 'red');
console.log(' cp1.toString() : ', cp1.toString());
console.log(' cp1 instanceof ColorPoint : ', cp1 instanceof ColorPoint); // true
console.log(' cp1 instanceof Point : ', cp1 instanceof Point); // true

// const cp2 = new ColorPoint2();
// console.log(' cp2.toString() : ', cp2.toString());

// const cp3 = new ColorPoint3();

const cp4 = new ColorPoint4();

const cp5 = new ColorPoint5();

// Object.getPrototypeOf方法可以用来从子类上获取父类。
// 因此，可以使用这个方法判断，一个类是否继承了另一个类。

console.log(' Object.getPrototypeOf(ColorPoint) === Point : ', Object.getPrototypeOf(ColorPoint) === Point); // true
