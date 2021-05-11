// 并发控制函数 传递一个数组 里面都是 函数，要控制执行数量，始终有n个函数并发运行着
// 利用递归不断检查执行中的有几个
const mapLimit = (arrFn, limit) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arrFn)) {
      reject(null);
    }
    let doing = 0;
    let result = [];
    let count = 0;
    let index = 0;
    const checkFn = () => {
      while (doing < limit && index < arrFn.length) {
        doing ++;
        let i = index;
        Promise.resolve(arrFn[index]()).then(data => {
          doing--;
          count++;
          result[i] = data;
          checkFn();
          if (count === arrFn.length) {
            resolve(result);
          }
        }).catch(err => {
          reject(err);
        });
        index++;
      }
    }
    checkFn();
  });
};

let i = 0;
let d = 0
mapLimit('.'.repeat(100).split('').map(item => {
  return () => {
    return new Promise((resolve, reject) => {
      i++;
      setTimeout(() => {
        resolve(++d);
      }, Math.random() * 100);
    }).then(res => {
      console.log(i);
      i--;
      return d;
    });
  }
}), 3).then(res => {
  console.log('all done', res);
});