import './App.css';
import * as React from "react";
import 'bulma';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";


function App(props) {
    return (
        <Router>
            <div className="App">
                <Route exact={true} path="/" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
            </div>
        </Router>
    )
}

export default App;
