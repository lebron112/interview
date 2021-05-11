/* 原理
  事件的订阅发布，通过dispath派发批量通知更新订阅的事件
  */
const easyRedux = (state = {}, stateChange) => {
  const listeners = [];
  const subscribe = (listener) => listeners.push(listener);
  const dispatch = (action) => {
    state = stateChange(state, action);
    listeners.forEach(listener => listener(state));
  }
  const getState = () => state;
  return { getState, dispatch, subscribe };
};