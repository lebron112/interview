/*
  ad(1,2,3,4);//10
  curriedAdd(1)(2)(3)(4)() //10
 */

const currying = function (fn) {
  let args = [];
  // es6
  // return function m(...arg) {
  //   if (!arg.length) {
  //     fn.apply(this, args);
  //   } else {
  //     args.push(...arg);
  //     return m;
  //   }
  // };
  // es5
  return function m() {
    if (!arguments.length) {
      fn.apply(this, args);
    } else {
      args = args.concat([].slice.apply(arguments));
      return m;
    }
  };
};

const ad = (...arg) => {
  const res = arg.reduce((a, b) => a + b);
  console.log(res);
  return res;
};
const curriedAdd = currying(ad);
curriedAdd(1, 2)(3)(4)(5)();