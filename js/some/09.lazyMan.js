/*  
实现一个LazyMan，可以按照以下方式调用:
LazyMan("Hank")输出:
Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")输出
//等待5秒
Wake up after 5
Hi This is Hank!
Eat supper
以此类推。
 */

// 考察的时对promise和微任务宏任务队列的掌握程度

function LazyMan(name) {
  const task = [];
  task.push(() => Promise.resolve().then(() => {
    console.log(`Hi! This is ${name}!`);
  }));
  const man = {
    sleep(time) {
      task.push(() => new Promise(res => {
        setTimeout(() => {
          console.log('wake up after ' + time);
          res();
        }, time * 1000)
      }));
      return man;
    },
    eat(food) {
      task.push(() => Promise.resolve().then(() => {
        console.log(`${food} ~`);
      }));
      return man;
    },
    sleepFirst(time) {
      task.unshift(() => new Promise(res => {
        setTimeout(() => {
          console.log(`wake up after ${time}`);
          res();
        }, time * 1000)
      }));
      return man;
    }
  };
  Promise.resolve().then(async () => {
    for (item of task) {
      await item();
    }
  });
  return man;
}
// LazyMan("Hank");
// LazyMan("Hank").sleep(10).eat("dinner");
// LazyMan("Hank").eat("dinner").eat("supper");
LazyMan("Hank").sleepFirst(5).eat("supper");
