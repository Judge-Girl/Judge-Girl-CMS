import React from "react";
import './NavigationBar.css';
import {NavLink, Redirect, useRouteMatch} from "react-router-dom";
import {studentService} from "../services/services";
import {useAuth} from "./commons/access-control/auth";

function link(currentPathName, to, name, className) {
    return (
        <NavLink to={to} activeClassName={`active-link ${className}`} className={className}
                 isActive={() => currentPathName.startsWith(to)}>{name}</NavLink>
    );
}

const NavigationBar = () => {
    const {admin, setAdmin} = useAuth();
    const { url: currentURL } = useRouteMatch();

    const onLogout = () => {
        studentService.logout()
            .then(() => {
                console.log(`Logout.`);
                setAdmin(null);
            });
    };

    return (
        <div className="navigation-bar">
            <header>Judge Girl <span>CMS</span></header>
            {admin ? link(currentURL, '/problems', 'Problems') : ""}
            {admin ? link(currentURL, '/exams', 'Exams') : ""}
            {admin ? link(currentURL, '/students', 'Students') : ""}
            {admin ? link(currentURL, '/admin', 'Admin') : ""}
            {admin ? <span className="logout" onClick={onLogout}>Logout</span> : <Redirect to="/"/>}
        </div>
    );
}

export default NavigationBar
