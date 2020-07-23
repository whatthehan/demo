## react-router-dom

实现简易的 `react-router-dom`

### 架构

使用 `React.Context` 保存 路由类型、当前路由、路由改变事件

```javascript
{
  type: 'default',
  currentPath: '',
  onChange: () => null
}
```

### BrowserRouter

监听 `popstate` 事件，路由变化时设置当前 `pathname`

```javascript
window.addEventListener('popstate', () => {
  setCurrentPath(window.location.pathname);
});
```

### HashRouter

监听 `hashchange` 事件，理由变化时切割 `#` 后字符串并设置为当前路由

```javascript
window.addEventListener('hashchange', () => {
  const paths = window.location.href.split('#');
  setCurrentPath(paths[1]);
});
```

### Route

接收 `path` 和 `component` 属性，从 `context` 中获取 `currentPath`，对比 `path` 决定是否返回 `component`

### Link

接收 `to` 属性

- `BrowserRouter` 下阻止 `a` 标签默认事件，通过 `pushState` 设置路由
  ```javascript
  const onClick = (e) => {
    e.preventDefault();
    window.history.pushState(null, '', to);
    onChange();
  };
  ```
- `HashRouter` 下在 to 属性前添加 `#`
  ```jsx
  <a href={`#${to}`} {...rest}>
    {rest.children}
  </a>
  ```

## Switch

// TODO

## Redirect

// TODO

## useLocation

// TODO

## useHistory

// TODO
