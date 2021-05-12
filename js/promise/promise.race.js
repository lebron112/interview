Promise.myRace = function (args) {
  if (!Array.isArray(args)) {
    console.warn('需要数组');
    return Promise.resolve();
  }
  return new Promise((reslove, reject) => {
    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i]).then(r => {
        reslove(r);
      }, err => {
        reject(err);
      })
    }
  });
};

Promise.myRace('.'.repeat(5).split('').map((item, index) => {
  return new Promise((reslove, reject) => {
    const t = Math.random() * 1000;
    console.log(t);
    setTimeout(() => {
      reslove(t);
    }, t)
  })
})).then(res => { console.log(res) });

Promise.myRace('.'.repeat(5).split('').map((item, index) => {
  return new Promise((reslove, reject) => {
    reject(index);
  })
})).catch(res => { console.log(res) });