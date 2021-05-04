import { useState } from "react";
import {
    BrowserRouter as Router,
    Redirect,
    Route
} from "react-router-dom";
import PrivateRoute from "./commons/access-control/PrivateRoute";
import {AuthContext} from "./commons/access-control/auth";
import NavigationBar from "./NavigationBar";
import {Login} from "./Login";
import {Dashboard} from "./Dashboard";
import {StudentList} from "./students/StudentList";
import {AdminList} from "./admins/AdminList";
import {GroupList} from "./students/GroupList";
import {GroupMembers} from "./students/GroupMembers";
import {ProblemEditor} from "./problem/ProblemEditor";
import {ExamList} from "./exam/ExamList";
import 'bulma';
import './App.css';


function App() {
    const [admin, setAdmin] = useState(null);

    return (
        <AuthContext.Provider value={{admin, setAdmin}}>
            <Router>
                <div className="App">
                    <NavigationBar/>
                    <Route exact path="/" component={Login}/>
                    <PrivateRoute path="/problems" component={Dashboard}/>
                    <PrivateRoute path="/students" component={StudentList}/>
                    <PrivateRoute path="/admins" component={AdminList}/>
                    <PrivateRoute path="/groups" exact component={GroupList}/>
                    <PrivateRoute path="/groups/:groupId/students" component={GroupMembers}/>
                    <PrivateRoute path="/problems/:problemId/edit" component={ProblemEditor}/>
                    <PrivateRoute path="/exams" component={ExamList}/>
                    <Redirect path="*" to="/"/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
