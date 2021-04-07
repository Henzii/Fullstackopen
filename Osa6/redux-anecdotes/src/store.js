import { createStore , combineReducers, applyMiddleware } from "redux"
import AnecdoteReducer from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer'
import FilterReducer from './reducers/filterReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers(
    {
        anecdotes: AnecdoteReducer,
        notification: NotificationReducer,
        filter: FilterReducer
    }
)
const store = createStore( reducer, composeWithDevTools( applyMiddleware( thunk )) )

export default store