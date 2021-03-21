import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {ProblemEditor} from "./problem/ProblemEditor";
import {ExamList} from "./exam/ExamList";
import 'bulma';
import './App.css';


function App(props) {
    return (
        <Router>
            <div className="App has-text-centered">
                <Route exact={true} path="/" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/problems/:problemId/edit" component={ProblemEditor}/>
                <Route path="/exams" component={ExamList}/>
            </div>
        </Router>
    )
}

export default App;
