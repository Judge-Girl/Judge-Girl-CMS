import React from "react";
import './NavigationBar.css';
import {NavLink, Redirect} from "react-router-dom";
import {studentService} from "../services/services";
import {useAuth} from "./commons/access-control/auth";

const NavigationBar = () => {
    const {admin, setAdmin} = useAuth();

    const onLogout = () => {
        studentService.logout()
            .then(() => {
                console.log(`Logout.`);
                setAdmin(null);
            });
    };

    if (!admin) {
        return <>
            <div className="navigation-bar">
                <header>Judge Girl <span>CMS</span></header>
            </div>
            <Redirect to="/"/>
        </>
    }

    return (
        <div className="navigation-bar">
            <header>Judge Girl <span>CMS</span></header>
            <NavLink to="/problems" activeClassName="active-link">Problem</NavLink>
            <NavLink to="/exams" activeClassName="active-link">Exam</NavLink>
            <NavLink to="/homework" activeClassName="active-link">Homework</NavLink>
            <NavLink to="/students" activeClassName="active-link">Student</NavLink>
            <NavLink to="/groups" activeClassName="active-link">Group</NavLink>
            <NavLink to="/admins" activeClassName="active-link">Admin</NavLink>
            <span className="logout" onClick={onLogout}>Logout</span>
        </div>
    );
}

export default NavigationBar
