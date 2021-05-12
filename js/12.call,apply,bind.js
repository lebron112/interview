Function.prototype.myCall = function (context, ...args) {
  if (!(typeof context === 'object' && context !== null)) {
    context = {};
  }
  const symbol = Symbol('symbol');
  context[symbol] = this;
  const res = context[symbol](...args);
  delete context[symbol];
  return res;
}

Function.prototype.myApply = function (context, args) {
  return this.myCall(context, ...args);
}

Function.prototype.myBind = function (context, ...args) {
  const that = this;
  return function () {
    return that.myCall(context, ...args, ...arguments);
  }
}

class Foo {
  constructor(name) {
    this.name = name;
  }
  say(age) {
    console.log(age);
    return this.name;
  }
}
let foo = new Foo('foo');
console.log(foo.say(20))
console.log(foo.say.myCall({ name: 'myCall', age: 19 }, 19))
console.log(foo.say.myApply({ name: 'myApply' }, [11]))
console.log(Math.max.myApply(null, [1, 2, 3]));
const max = Math.max.myBind(null, 1);
console.log(max(2, 3, 4))