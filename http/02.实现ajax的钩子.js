/* 
  onreadystatechange
  open()
  send()
  status
var ajax = new XMLHttpRequest();
//规定请求的类型、URL 以及是否异步处理请求。
ajax.open('GET',url,true);
//发送信息至服务器时内容编码类型
ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); 
//发送请求
ajax.send(null);  
//接受服务器响应数据
ajax.onreadystatechange = function () {
    if (ajax.readyState == 4 && (ajax.status == 200 || ajax.status == 304)) { 
    }
};

通过劫持属性和方法 劫持常用的即可 完全做到需要花很长的时间 知道原理即可
*/

class AJAX {
  constructor({ beforeSend = () => { }, beforeOpen = () => { } }, { afterSend = () => { }, onsuccess = () => { }, onerror = () => { } }) {
    if (window) {
      this._originalRequest = new window.XMLHttpRequest();
      const ajax = this._ajax = window.XMLHttpRequest;
      window.XMLHttpRequest = AJAX;
      this.before = { beforeSend, beforeOpen };
      this.after = { onsuccess, onerror };
      this._onreadystatechange = null;
      this._open = this._ajax.open;
      this._send = this._ajax.send;
      this._ajax.onreadystatechange = function () {
        typeof this._onreadystatechange === 'function' && this._onreadystatechange.call(ajax);
        if (ajax.readyState == 4 && (ajax.status == 200 || ajax.status == 304)) {
          onsuccess.call(ajax);
        } else {
          onerror.call(ajax);
        }
        afterSend.call(ajax);
      }

    } else {

    }
  }

  set onreadystatechange(fn) {
    this._onreadystatechange = fn;
  }
  get onreadystatechange() {
    return this._onreadystatechange;
  }

  get readyState() {
    return this._ajax.readyState;
  }

  get status() {
    return this._ajax.status;
  }

  open(...args) {
    const { beforeOpen } = this.before;
    if (beforeOpen.apply(this._ajax) === false) {
      return;
    }
    this._ajax.open(...args);
  }

  send(data) {
    const { beforeSend, } = this.before;
    if (beforeSend.apply(this._ajax) === false) {
      return;
    }
    this._ajax.send(data);
  }
}