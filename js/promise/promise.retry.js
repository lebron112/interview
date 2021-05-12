// 实现一个prmose.retry 失败后会再重新尝试次数，需要注意尝试次数是否把第一次执行也算进去
Promise.retry = function (fnc, time = 1) {
  return new Promise(function (resolve, reject) {
    let index = 0;
    const job = () => {
      Promise.resolve(fnc()).then(res => {
        resolve(res);
      }).catch(err => {
        index++;
        if (index < time) {
          job();
        } else {
          reject(err);
        }
      });
    }
    job();
  })
};

Promise.retry(() => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const t = Math.random();
      console.log(t);
      t > .9 ? resolve() : reject()
    }, 300);
  })
}, 5).then(res => {
  console.log('resolve')
}).catch(err => {
  console.log('reject')
})