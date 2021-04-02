import 'bulma';
import './App.css';
import * as React from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {ProblemEditor} from "./problem/ProblemEditor";
import {ExamList} from "./exam/ExamList";
import {StudentList} from "./students/StudentList";
import {GroupList} from "./students/GroupList";
import {AdminList} from "./admins/AdminList";
import {NavigationBar} from "./NavigationBar";


function App(props) {
    return (
        <Router>
            <div className="App">
                <NavigationBar/>
                <Route exact={true} path="/" component={Login}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path="/students" component={StudentList}/>
                <Route path="/admins" component={AdminList}/>
                <Route path="/groups" component={GroupList}/>
                <Route path="/problems/:problemId/edit" component={ProblemEditor}/>
                <Route path="/exams" component={ExamList}/>
            </div>
        </Router>
    )
}

export default App;
