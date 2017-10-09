// super这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。

// 1.super作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次super函数。

class A {
  constructor() {
    console.log(new.target.name);
  }
}

// 注意
// super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，
// 因此super()在这里相当于A.prototype.constructor.call(this)。
class B extends A {
  constructor() {
    super();
  }
}

const a = new A(); // A

// const b = new B(); // 会报错 new.target是undefine,不知道啥原因？？

// 作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。

// 2.super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

class A2 {
  constructor() {
    this.x = 5676;
  }

  p() {
    return 2;
  }

  // ES6 规定，通过super调用父类的方法时，super会绑定子类的this。
  print() {
    console.log(this.x);
  }
}

class B2 extends A2 {
  // 由于绑定子类的this，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。??
  constructor() {
    super();
    console.log(super.p());
    this.x = 999;
    super.x = 888;
    // super.x赋值为888，这时等同于对this.x赋值为888。而当读取super.x的时候，读的是A.prototype.x，所以返回undefined。??
    // 测试发现依然是 999 why？？
    console.log(' this.x : ', this.x); // 888
    console.log(' super.x : ', super.x); // undefined
    console.log(' super.valueOf() instanceof B : ', super.valueOf() instanceof B); // false ??
    console.log(' super.valueOf() instanceof A : ', super.valueOf() instanceof A); // false ??
  }

  get prop() {
    // 由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

    console.log(super.x); // undefined
  }

  set prop(value) {
    console.log('setter : ', value);
  }

  method() {
    super.print();
  }
}

let b2 = new B2(); // 2
b2.prop; // undefined

b2.prop = 123; //setter : 123,可是这个值存到那里去了
b2.prop123 = 123; // 没有值

// ES6 规定，通过super调用父类的方法时，super会绑定子类的this。
b2.method(); // 999

// 如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象。
// super在静态方法之中指向父类，在普通方法之中指向父类的原型对象。
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1

var child = new Child();
child.myMethod(2); // instance 2

// 注意，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

// 最后，由于对象总是继承其他对象的，所以可以在任意一个对象中，使用super关键字。

var obj = {
  toString() {
    return "MyObject: " + super.toString();
  }
};

console.log(' obj.toString() : ', obj.toString()); // MyObject: [object Object]
