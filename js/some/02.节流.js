// 立即执行版
const throttle = function (fn, time) {
  let t = 0;
  return function (...args) {
    const self = this;
    const n = Date.now() - t;
    if (n >= time) {
      fn.apply(self, args);
      t = Date.now();
    }
  };
}

// 延后执行版
const deloyThrottle = function (fn, time) {
  let t = 0;
  let d = null;
  return function (...args) {
    const self = this;
    const n = Date.now() - t;
    clearTimeout(d);
    if (n >= time) {
      fn.apply(self, args);
      t = Date.now();
    } else {
      d = setTimeout(function () {
        fn.apply(self, args);
      }, n);
    }
  }
};

const test = (v) => console.log(v);
const fn = deloyThrottle(test, 1000);
let i = 0;
let time = null;
function deep() {
  i++;
  clearTimeout(time);
  if (i < 100) {
    time = setTimeout(() => {
      fn(i);
      return deep();
    }, 20);
  } else {
    return;
  }
}

// 币安一面面试题
import { useRef, useEffect, useCallback } from 'react';
const useDebounce = (fn, wait, deep = []) => {
  const { current } = useRef({ t: 0, delay: null, fn });
  useEffect(() => {
    current.fn = fn;
  }, [fn])
  return useCallback(function () {
    const n = Date.now() - current.t;
    clearTimeout(current.delay);
    const selt = this;
    if (n > wait) {
      current.fn.apply(selt, [...arguments]);
      current.t = Date.now();
    } else {
      current.delay = setTimeout(function () {
        current.fn.apply(selt, [...arguments]);
      }, wait);
    }
  }, [deep]);
};

deep();