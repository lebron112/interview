// 不适用promise或setTimeout实现类似异步的任务 
// Promise.resolve().then(fn)
// setTimeout(fn)

let instance = null;

class AsyncTask {
  constructor() {
    if (instance) {
      return instance;
    }
    this.callBack = () => { }
    let count = 1;
    this.observer = new MutationObserver(() => this.callBack());
    const textNode = document.createTextNode(String(count))
    this.observer.observe(textNode, {
      characterData: true
    })
    this.microTimerFunc = () => {
      count = (count + 1) % 2;
      textNode.data = String(count);
    }
  }
  reslove() {
    this.microTimerFunc();
    return this;
  }
  listener(fn) {
    this.callBack = fn;
  }
}

let asynTask = new AsyncTask();
asynTask.reslove().listener(() => { console.log(1) });
for(let i = 0 ; i < 5; i ++) {
  console.log(`main job${i}`)
}