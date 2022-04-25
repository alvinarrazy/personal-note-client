import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { agendaReducers } from './agendaReducers'
import types from '../Constants'

const rootReducer = combineReducers({
    agendaState: agendaReducers
})

const store = createStore(rootReducer, applyMiddleware(thunk))

const setInitialData = (payload) => {
    console.log('payload on reducer index:', payload)
    return {
        type: types.SET_INITIAL,
        agendaListsData: payload,
    }
}

const getAsyncStorage = () => {
    return (dispatch) => {
        let initialData = localStorage.getItem('agendaData')

        return dispatch(setInitialData(JSON.parse(initialData)))
    };
};

store.dispatch(getAsyncStorage())

export default store