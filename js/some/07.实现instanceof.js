// 原理 查找__proto__是否等于构造函数的prototype 基础数据类型都是false

function instanceOf(data, constructor) {
  if (typeof constructor !== 'function') {
    return false;
  }
  if (data === null || data === undefined || !['object', 'function'].includes(typeof data)) {
    return false;
  }
  let __proto__ = data.__proto__;
  const prototype = constructor.prototype;
  if (!prototype) { return false };
  while (__proto__) {
    if (__proto__ === prototype) {
      return true;
    } else {
      __proto__ = __proto__.__proto__;
    }
  }
  return false;
}

function grandpa() {
}
function father() {
}
father.prototype = new grandpa()
function son() {
}
son.prototype = new father()
let xiaoming = new son()
console.log(instanceOf(xiaoming, son)); //true
console.log(instanceOf(xiaoming, father)); //true
console.log(instanceOf(xiaoming, grandpa)); //true

console.log(instanceOf(new String('1'), String)); //true
console.log(instanceOf(new String('1'), Object)); //true
console.log(instanceOf(1, Object)); //false