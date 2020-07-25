import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App'; // 根组件 Vue: App.vue
import * as serviceWorker from './serviceWorker';
import 'react-virtualized/styles.css'; // 导入虚拟化长列表的样式

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
