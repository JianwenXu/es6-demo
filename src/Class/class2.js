// 类的方法内部如果含有this，它默认指向类的实例。但是，必须非常小心，一旦单独使用该方法，很可能报错。

class Logger {
  printName(name = 'there') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger = new Logger();
const { printName } = logger;
logger.printName(); // Hello there

// printName(); // TypeError: Cannot read property 'print' of undefined
// printName方法中的this，默认指向Logger类的实例。
// 但是，如果将这个方法提取出来单独使用，this会指向该方法运行时所在的环境，因为找不到print方法而导致报错。

// 解决方法1：在构造函数中绑定this,这样就不会找不到print 方法了

class Logger2 {
  constructor() {
    this.printName2 = this.printName2.bind(this);
  }

  printName2(name = 'there2') {
    this.print(`Hello ${name}`);
  }

  print(text) {
    console.log(text);
  }
}

const logger2 = new Logger2();
const { printName2 } = logger2;
logger2.printName2(); // Hello there2
printName2(); // Hello there2

// 解决方法2：使用箭头函数

class Logger3 {
  constructor() {
    this.printName3 = (name = 'there3') => {
      this.print(` Hello ${name}`);
    }
  }

  print(text) {
    console.log(text);
  }
}

const logger3 = new Logger3();
const { printName3 } = logger3;
logger3.printName3(); // Hello there3
printName3(); // Hello there3

// 下面的写法会报错，不知道为啥

class Logger4 {

  print(text){
    console.log(text);
  }

  // printName4 = 123;

  // printName4 = (name = 'there4') => {
  //   this.print(` Hello ${name}`);
  // }
}

const logger4 = new Logger4();
const { printName4 } = logger4;
// logger4.printName4(); // Hello there4
// printName4(); // Hello there4

console.log(logger4.printName4);
console.log(printName4);

// 解决方法3：使用Proxy，获取方法的时候，自动绑定this(那块还没看，稍后回过头来再说)
