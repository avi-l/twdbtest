import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import {
    BrowserRouter as Router
} from 'react-router-dom'


ReactDOM.render(
    <Router>
        <App />
        {/* <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet"></link> */}
    </Router>,
    document.getElementById('root')
)