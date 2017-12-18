import {createStore, combineReducers} from 'redux'

import tobuy from './components/state/tobuy'

const reducer = combineReducers({
  tobuy,
})

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

store.subscribe(() => {
})

export default store