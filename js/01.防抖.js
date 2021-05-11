// 非立即执行
const defShake = function (fn, delay = 100) {
  let time = null;
  return function (...args) {
    const self = this;
    clearTimeout(time);
    time = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  }
}
// 立即执行版本
const defShake = function (fn, delay = 100) {
  let time = null;
  return function (...args) {
    const self = this;
    // 判断time不存在就先执行一次
    if(!time) {
      fn.apply(self, args);
    }
    clearTimeout(time);
    time = setTimeout(function () {
      fn.apply(self, args);
    }, delay);
  }
}

const test = (v) => console.log(v);
const fn = defShake(test, 100);
let i = 0;
let time = null;
function deep() {
  i ++;
  clearTimeout(time);
  if (i < 10) {
    time = setTimeout(() => {
      fn(i);
      return deep();
    }, 50);
  } else {
    return;
  }
}

deep();