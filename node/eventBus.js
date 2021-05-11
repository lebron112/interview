/*
  实现一个event bus on off emit once
 */

class EventBus {
  constructor(max) {
    this.maxListen = max || 10
    this.events = {};// item { origin:fn, bind:xxx}
  }
  on(name, fn) {
    if (!this.events[name]) {
      this.events[name] = [];
    }
    if (typeof fn === 'function') {
      if (this.events[name].length >= this.maxListen) {
        console.warn(`${name} 超过 ${this.maxListen}个`)
        return this;
      }
      this.events[name].push(fn);
    }
    return this;
  }
  off(name, fn) {
    if (typeof fn !== 'function') {
      this.events[name] = [];
    } else {
      this.events[name] = this.events[name].filter(item => item !== fn);
    }
    return this;
  }
  emit(name, ...data) {
    const self = this;
    if (!this.events[name]) {
      console.warn(`${name} 事件未注册`);
      return this;
    }
    this.events[name].forEach(itemFn => {
      itemFn.apply(self, data);
    });
    return this;
  }
  once(name, ...data) {
    this.emit(name, ...data);
    this.off(name);
    return this;
  }
}

const test1 = new EventBus(2);
test1.on('test', v => console.log(v + 1))
  .on('test', v => console.log(v + 2))
  .on('test', v => console.log(v + 3))
  .on('gg', v => console.log(v + 1))
  .emit('test', 1)
  .once('gg', 'gg1')
  .emit('gg', 'gg2');