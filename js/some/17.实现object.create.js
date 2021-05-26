Object.mycreate = function (proto) {
  function F() { };
  F.prototype = proto;
  return new F();
}
function Bar() { };
Bar.prototype.eat = function () {
  console.log('111');
}
var h1 = Object.mycreate(new Bar());
console.dir(h1);
