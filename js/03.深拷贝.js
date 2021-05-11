// 简单深拷贝 只有对象数组和基础类型

const deepClone = (data) => {
  let res;
  if (typeof data === 'object') {
    if (data === null) {
      return data;
    } else {
      if (Array.isArray(data)) {
        res = [];
        for (let i = 0; i < data.length; i++) {
          res[i] = deepClone(data[i]);
        }
      } else {
        res = Object.create(null);
        for (const i in data) {
          if (data.hasOwnProperty(i)) {
            res[i] = deepClone(data[i]);
          }
        }
      }
      return res;
    }
  } else {
    return data;
  }
};
const d = {
  a: 1, b: '2', c: 3, d: 4, e: 5,
  f: [{ x: 2 }, 2, '9', false, { a: { b: { c: [1, 2, 2, '3', undefined, null] } } }]
};
console.log(JSON.stringify( deepClone(d)), deepClone(d) === d)