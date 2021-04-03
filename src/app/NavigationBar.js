import React from "react";
import './NavigationBar.css';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import {studentService} from "../services/services";
import {useAuth} from "./commons/access-control/auth";

function link(currentPathName, to, name, className) {
    return (
        <NavLink to={to} activeClassName={`active-link ${className}`} className={className}
                 isActive={() => currentPathName.startsWith(to)}>{name}</NavLink>
    );
}

const NavigationBar = withRouter(({history}) => {
    const {admin, setAdmin} = useAuth();
    const currentPathName = history.location.pathname;

    const onLogout = () => {
        studentService.logout()
            .then(() => {
                console.log(`Logout.`);
                setAdmin(null);
                history.replace("/");
            });
    };

    return (
        <div className="navigation-bar">
            <header>Judge Girl <span>CMS</span></header>

            {admin ? link(currentPathName, '/problems', 'Problems') : ""}
            {admin ? link(currentPathName, '/exams', 'Exam') : ""}
            {admin ? link(currentPathName, '/students', 'Students') : ""}
            {admin ? link(currentPathName, '/admins', 'Admin') : ""}

            {admin ? <span className="logout" onClick={onLogout}>Logout</span> : ""}

        </div>
    );
});

export {NavigationBar};
