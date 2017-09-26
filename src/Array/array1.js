// 扩展运算符(...), 将一个数组转化为用逗号分隔的参数序列
console.log(...[1, 2, 3]); // 1 2 3
console.log(1, ...[2, 3, 4], 5); // 1 2 3 4 5
// 该运算符主要用于函数调用
function push(array, ...items) {
  array.push(...items);
}
var arr1 = [1, 2, 3];
console.log(' arr1 : ', arr1);
push(arr1, [4, 5, 6, 7]);
console.log(' arr1 (after push) : ', arr1);
