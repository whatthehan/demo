function createStore(reducer, initialState) {
  let state = initialState; // 状态
  let listenerQueue = []; // 监听函数队列

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listenerQueue.forEach((item) => {
      item.call(null);
    });

    return action;
  }

  function subscribe(listener) {
    listenerQueue.push(listener);

    return function () {
      const index = listenerQueue.indexOf(listener);
      if (index > -1) {
        listenerQueue.splice(index, 1);
      }
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

export default createStore;
