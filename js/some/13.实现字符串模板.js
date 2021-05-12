/* 字节面试题
能否实现es6的模板字符串方法sprintf

const template = "My name is ${name},I'm from ${city}";
const result = sprintf(template, {
        name: 'Coder',
        city: 'Beijing',
});
console.log(result);
// My name is Coder,I'm from Beijing
 */

/* 用正则匹配每个'${xxx}',然后挨个替换掉 考察队正则的熟系成都 */

const template = "My name is  ${name},I'm from ${city} ${abc} ${fc}";
const result = sprintf(template, {
  name: 'Coder',
  city: 'Beijing',
  fc: null,
});
console.log(result);

function sprintf(temp, data = {}) {
  const matchs = temp.match(/\${.*?(?<=})/g) || [];
  let str = temp;
  matchs.forEach(item => {
    const key = item.replace(/\${/, '').replace(/}/,'');
    str = str.replace(item, String(data[key]));
  });
  return str;
}