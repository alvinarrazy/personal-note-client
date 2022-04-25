import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { githubReducer } from './githubReducer'

const rootReducer = combineReducers({
    githubState: githubReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store