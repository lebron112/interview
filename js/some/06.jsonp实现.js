// 原理 利用创建script标签，src=地址的形式，用一个回调函数接受数据

function callback(data) {
  try {
    const res = JSON.parse(data);
  } catch (e) {
    console.log(data);
  }
}
window.callback = callback;
// 不好，回调定义在全局上 参数未处理
const jsonp = (src) => {
  const script = document.createElement('script');
  let newSrc = src += (src.test(/\?/) ? '&cb=callback' : '?cb=callback');
  script.src = newSrc;
  document.head.appendChild(scirpt);
  script.onload = function () {
    script.parentNode && scirpt.parentNode.removeChild(script);
  }
};

window.jsonp = jsonp;


const JSONP = function ({ url, params = {}, callback, callbackId }) {
  let index = JSONP.index || 1;
  callbackId = callbackId || index++;
  const script = document.createElement('script');
  JSONP.callbacks = JSONP.callbacks || {};
  JSONP.callbacks[callbackId] = function (data) {
    script.parentNode && script.parentNode.removeChild(script);
    callback(data);
  };
  const src = url + '?' + Object.keys(params).map(key => `${key}=${encodeURIComponent(params[key])}`).join('&') +
    `&cb=JSONP.callbacks[${callbackId}]`;
  script.src = src;
  document.body.appendChild(script);
  JSONP.index++;
};

window.JSONP = JSONP;
