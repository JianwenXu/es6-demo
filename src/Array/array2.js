// 替代数组的apply方法

// 由于扩展运算符可以展开数组，所以不再需要apply方法，将数组转为函数的参数了。

let args = [0, 1, 2];

// ES 5
function f1(x, y, z) {
  console.log('ES 5 : ', x, y, z); // ES 5: 0, 1, 2
}

f1.apply(null, args);

// ES 6
function f2(x, y, z) {
  console.log('ES 6 : ', x, y, z);
}

f2(...args); // ES 6: 0, 1, 2

// 下面是扩展运算符取代apply方法的一个实际的例子，应用Math.max方法，简化求出一个数组最大元素的写法。

let arr = [14, 3, 77];

// ES5
console.log(Math.max.apply(null, arr)); // 77

// ES6
console.log(Math.max(...arr)); // 77

// 另一个例子是通过push函数，将一个数组添加到另一个数组的尾部

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
let arr3 = [6, 7, 8];

// ES 5
Array.prototype.push.apply(arr1, arr2);

console.log(arr1); // [0, 1, 2, 3, 4, 5]

// ES 6
arr3.push(...arr2);

console.log(arr3); // [6, 7, 8, 3, 4, 5]

// 下面是另外一个例子。

// ES5
let date1 = new (Date.bind.apply(Date, [null, 2015, 1, 1]));

console.log(date1); // Sun Feb 01 2015 00:00:00 GMT+0800 (中国标准时间)

// ES6
let date2 = new Date(...[2015, 1, 1]);

console.log(date2); // Sun Feb 01 2015 00:00:00 GMT+0800 (中国标准时间)
