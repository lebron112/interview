// 币安一面面试题
import { useRef, useEffect, useCallback } from 'react';
const useDebounce = (fn, wait, deep = []) => {
  const { current } = useRef({ t: 0, delay: null, fn });
  useEffect(() => {
    current.fn = fn;
  }, [fn])
  return useCallback(function () {
    const n = Date.now() - current.t;
    clearTimeout(current);
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