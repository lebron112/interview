Promise.myAll = function (args) {
  if (!Array.isArray(args)) {
    console.warn('需要数组');
    return Promise.resolve([]);
  }
  let result = [];
  let count = 0;
  return new Promise((resolve, reject) => {
    for (let i = 0; i < args.length; i++) {
      Promise.resolve(args[i]).then(data => {
        count++;
        result[i] = data;
        if (count === args.length) {
          resolve(result);
        }
      }).catch(e => {
        reject(e);
      });
    }
  });
};

Promise.myAll('.'.repeat(5).split('').map((item, index) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(index);
    }, Math.random() * 1000)
  })
})).then(res => { console.log(res) });

Promise.myAll('.'.repeat(5).split('').map((item, index) => {
  return new Promise((resolve, reject) => {
    reject(index);
  })
})).catch(res => { console.log(res) });