import {useState} from "react";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import PrivateRoute from "./commons/access-control/PrivateRoute";
import {AuthContext} from "./commons/access-control/auth";
import NavigationBar from "./NavigationBar";
import {Login} from "./Login";
import {ProblemList} from "./problem/list/ProblemList";
import {StudentList} from "./students/StudentList";
import {HomeworkList} from './homework/HomeworkList';
import {AdminList} from "./admins/AdminList";
import {GroupList} from "./group/GroupList";
import {ExamList} from "./exam/ExamList";
import 'bulma';
import './App.css';
import {ScrollToTop} from "./commons/control/ScrollToTop";

function App() {
    const [admin, setAdmin] = useState(null);

    return (
        <AuthContext.Provider value={{admin, setAdmin}}>
            <Router>
                <div className="App">
                    <NavigationBar/>
                    <Switch>
                        <Route path="/" exact component={Login}/>
                        <PrivateRoute path="/problems" component={ProblemList}/>
                        <PrivateRoute path="/exams" component={ExamList}/>
                        <PrivateRoute path="/students" component={StudentList}/>
                        <PrivateRoute path="/homework" component={HomeworkList}/>
                        <PrivateRoute path="/groups" exact component={GroupList}/>
                        <PrivateRoute path="/groups/:groupId/students" component={GroupMembers}/>
                        <PrivateRoute path="/admins" component={AdminList}/>
                        <Route path="*">
                            <Redirect to="/"/>
                        </Route>
                    </Switch>
                    <ScrollToTop/>
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
