const flatten = (arr) => {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      arr.splice(i, 1, ...flatten(arr[i]));
      i--;
    } else {
      res.push(arr[i]);
    }
  }
  return res;
};
// 不使用递归
// 利用一个栈来实现
// 取出栈顶的第一个元素，如果是数组，那么把他扁平化一次丢入栈顶 这样多维就会一直被转化为一维
const flatten2 = (arr) => {
  const res = [];
  const stack = [...arr];
  while (stack.length) {
    const next = stack.pop();
    if (Array.isArray(next)) {
      [].push.apply(stack, next);
      // stack.push(...next);
    } else {
      res.push(next);
    }
  }
  return res.reverse();
};

console.log(flatten([[-1], 1, [2], [3, 4, 7, [7]]]));
console.log(flatten2([[-1], 1, [2], [3, 4, 7, [7]]]));