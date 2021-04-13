import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './tyyli.css'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import Container from '@material-ui/core/Container'

ReactDOM.render(
    <Container>
        <Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>
    </Container>,
    document.getElementById('root')
)