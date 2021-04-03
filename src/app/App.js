import 'bulma';
import './App.css';
import * as React from "react";
import {useState} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {ProblemEditor} from "./problem/ProblemEditor";
import {ExamList} from "./exam/ExamList";
import {StudentList} from "./students/StudentList";
import {GroupList} from "./students/GroupList";
import {AdminList} from "./admins/AdminList";
import {NavigationBar} from "./NavigationBar";
import {AuthContext} from "./commons/access-control/auth";
import PrivateRoute from "./commons/access-control/PrivateRoute";


function App() {
    const [admin, setAdmin] = useState(null);

    return (
        <AuthContext.Provider value={{admin, setAdmin}}>
            <Router>
                <div className="App">
                    <NavigationBar/>
                    <Redirect path="*" to="/"/>
                    <Route exact={true} path="/" component={Login}/>
                    <PrivateRoute path="/problems" component={Dashboard}/>
                    <PrivateRoute path="/students" component={StudentList}/>
                    <PrivateRoute path="/admins" component={AdminList}/>
                    <PrivateRoute path="/groups" component={GroupList}/>
                    <PrivateRoute path="/problems/:problemId/edit" component={ProblemEditor}/>
                    <PrivateRoute path="/exams" component={ExamList}/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
