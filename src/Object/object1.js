// __proto__属性，Object.setPrototypeOf()，Object.getPrototypeOf()

// __proto__属性（前后各两个下划线），用来读取或设置当前对象的prototype对象。
// 目前，所有浏览器（包括 IE11）都部署了这个属性。
// 标准明确规定，只有浏览器必须部署这个属性，其他运行环境不一定需要部署，而且新的代码最好认为这个属性是不存在的
// 无论从语义的角度，还是从兼容性的角度，都不要使用这个属性，
// 而是使用下面的Object.setPrototypeOf()（写操作）、Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替。

// Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象，返回参数对象本身。
// 它是 ES6 正式推荐的设置原型对象的方法。

// 格式
// Object.setPrototypeOf(object, prototype)
// 等价于
// function (obj, proto) {
//   obj.__proto__ = proto;
//   return obj;
// }

let proto = {};
let obj = { x: 10 };
Object.setPrototypeOf(obj, proto);

proto.x = 100;
proto.y = 20;
proto.y = 40;
proto.z = 30;

console.log(obj.x); // 10
console.log(obj.y); // 40
console.log(obj.z); // 30

// 如果第一个参数不是对象，会自动转为对象。但是由于返回的还是第一个参数，所以这个操作不会产生任何效果。

console.log(Object.setPrototypeOf(1, {}) === 1); // true
console.log(Object.setPrototypeOf('foo', {}) === 'foo'); // true
console.log(Object.setPrototypeOf(true, {}) === true); // true

// 由于undefined和null无法转为对象，所以如果第一个参数是undefined或null，就会报错。

// Object.getPrototypeOf与Object.setPrototypeOf方法配套，用于读取一个对象的原型对象。

// 如果参数不是对象，会被自动转为对象。

console.log(Object.getPrototypeOf(1));
// 等价于 : console.log(Object.getPrototypeOf(Number(1)));
console.log(Object.getPrototypeOf('foo'));
// 等价于 : console.log(Object.getPrototypeOf(String('foo')));
console.log(Object.getPrototypeOf(true));
// 等价于 : console.log(Object.getPrototypeOf(Boolean(true)));

console.log(Object.getPrototypeOf(1) === Number.prototype); // true
console.log(Object.getPrototypeOf('foo') === String.prototype); // true
console.log(Object.getPrototypeOf(true) === Boolean.prototype); // true

// 如果参数是undefined或null，它们无法转为对象，所以会报错。
