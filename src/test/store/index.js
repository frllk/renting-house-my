/**
 * 创建 Redux store 来存放应用的状态。
 * reducer：(previousState, action) => newState
 */
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
// 导入reducer
import rootReducer from './reducers'

// const store = createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// )


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export default store