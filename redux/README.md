## redux

极 `low` 版 `redux` 以及 `react-redux` 实现

### createStore

`createStore` 接收三个参数：

- `reducer`
- `initialState`：初始状态

返回三个函数，分别为：

- `getState`：获取当前 `state`
- `dispatch`：触发 `state` 改变
- `subscribe`：订阅函数

#### getState

```javascript
function getState() {
  return state;
}
```

#### subscribe

`subscribe` 是 `createStore` 的订阅者，接收一个 `listener` 监听函数，当 `state` 改变时执行监听函数，返回一个函数目的是取消订阅。

`createStore` 内部维护一个 `listener` 队列，当注册订阅时，将监听函数存入该队列中。

```javascript
function subscribe(listener) {
  listenerQueue.push(listener);

  return function () {
    const index = listenerQueue.indexOf(listener);
    if (index > -1) {
      listenerQueue.splice(index, 1);
    }
  };
}
```

#### dispatch

`dispatch` 是 `createStore` 的发布者，接收 `action` 参数执行 `reducer`，然后执行所有监听函数

```javascript
function dispatch(action) {
  state = reducer(state, action);
  listenerQueue.forEach((item) => {
    item.call(null);
  });

  return action;
}
```

#### Provider

直接使用 `React.createContext` 创建，`value`值为传入的 `store` 属性

```jsx
const Provider = ({ store, children }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};
```

#### useDispatch

直接使用 `React.useContext`，返回 `value` 中的 `dispatch`

```javascript
function useDispatch() {
  const { dispatch } = React.useContext(Context);
  return dispatch;
}
```

#### useSelector

与 `useDispatch` 类似，返回经过 `selector` 参数得到的 `state`

比较麻烦的是，`state` 数据更新并不会触发 `rerender`，所以需要引入 `createStore` 的 `subscribe` 函数，同时利用 `React.useReducer` 方法返回的函数，当数据更新时执行该函数

```javascript
function useSelector(selector = (data) => data) {
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const store = React.useContext(Context);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceRender();
    });

    return () => unsubscribe();
  }, [store]);

  const state = selector(store.getState());

  return state;
}
```

#### equalityFn

数据深浅对比

// TODO

## 其他

#### combineReducers

// TODO

#### compose

// TODO
