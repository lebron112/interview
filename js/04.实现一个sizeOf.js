// 实现一个sizeOf函数， 实现计算改值占的内存 数字8字节，字符串2*长度 布尔4字节

const sizeOf = (value) => {
  const map = new WeakMap();
  const check = (data) => {
    if (typeof data === 'string') return data.length * 2;
    if (typeof data === 'number') return 8;
    if (typeof data === 'boolean') return 4;
    if (!data) {
      return 0
    } else {
      if (typeof data === 'object') {
        if (!map.has(data)) {
          map.set(data, null)
        } else {
          return 0;
        }
        if (Array.isArray(data)) {
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            sum += check(data[i]);
          }
          return sum;
        } else {
          let sum = 0;
          for (const i in data) {
            if (data.hasOwnProperty(i)) {
              sum += i.length * 2;
              if (typeof data[i] === 'object' && data[i] !== null) {
                if (!map.has(data[i])) {
                  sum += check(data[i]);
                  map.set(data[i], null);
                }
              } else {
                sum += check(data[i]);
              }
            }
          }
          return sum;
        }
      }
    }
  }
  const res = check(value);
  return res;
};

console.log(sizeOf(1)) // 8

console.log(sizeOf('abc')) // 6

console.log(sizeOf(false)) // 4

const data = { a: false };
const arr = [1, 2, 3, 4, 'abc', data];
console.log(sizeOf(data)); // 6
console.log(sizeOf(arr));//44

const obj = {
  a: 7,
  data,
  b: arr,
  c: { 7: 8, arr }
}; // 82
console.log(sizeOf(obj));
console.log(sizeOf({
  a: 111,
  b: 'cccc',
  2222: false
})); //32