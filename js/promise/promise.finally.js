
/*
  实现以个  promise.myFinally 不管成功失败都调用 
  链式调用，this 就是执行后返回的promise
  没有参数接手
  但是会返回执行成功或执行错误的结果
  var a = xxxx a.myFinally((r)=>{});
*/
Promise.prototype.myFinally = function (callback) {
  if (typeof callback === 'function') {
    return this.then(data => {
      return Promise.resolve(callback()).then(() => data);
    }, err => {
      return Promise.resolve(callback()).then(() => { throw err });
    });
  }
  return this;
};

const p1 = new Promise((res, rej) => {
  setTimeout(() => {
    res(1);
  }, 1000);
});

const p2 = new Promise((res, rej) => {
  setTimeout(() => {
    rej('错误');
  }, 1000);
});
p1.myFinally((v) => {
  console.log(v, 'v 应为 undefined');
}).then(r => console.log(r,'应为 1'));

p2.myFinally((error) => {
  console.log(error, 'error 应为 undefined');
}).catch((err) => console.log(err, '应为错误'));
