// new 构造函数，这个构成函数的prototype为原型 创建一个对象，如果返回值为对象，则返回对象，否则返回this

//  new Person('xiaoming', 25); //name xiaoming age 25
// new Date()
function myNew(constructor, ...args) {
  if (typeof constructor !== 'function' || !constructor.prototype) {
    throw 'xxx';
  }
  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);
  return(typeof res === 'object' && res !== null)?res:obj;
}

function Foo(name, age) {
  // if (!name) throw 'need name';
  this.name = name;
  this.age = age;
  // return [];
}
const newObj = myNew(Foo, 'zhangsan');
console.log(newObj);
console.log(newObj instanceof Foo);
const s = new Foo('a');
console.log(s);
console.log(s instanceof Foo);
console.log(myNew(Date) instanceof Date);