// 因为JS是单线程，所以是需要阻塞的
const sleep = (time) => {
  const t = Date.now();
  while (Date.now() - t < time) { }
};

var a = Date.now();
sleep(1000);
console.log(Date.now() - a);
