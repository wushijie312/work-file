import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
const Application  = ({match}) => {
    return <div>
            <h2>{match.params.id}</h2>
            <Link to='/'>App 管理</Link>
        </div>
}
export default Application;
