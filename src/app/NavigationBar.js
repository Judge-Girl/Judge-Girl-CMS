import React, {createRef, useEffect} from "react";
import './NavigationBar.css';
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";

function link(currentPathName, to, name, className) {
    return (
        <NavLink to={to} activeClassName={`active-link ${className}`} className={className}
        isActive={() => currentPathName.startsWith(to)}>{name}</NavLink>
    );
}

const NavigationBar = withRouter(({history}) => {
    const currentPathName = history.location.pathname;
    console.log(currentPathName);

    const onLogout = (e) => {
        // TODO: Logout;
        console.log(`Logout.`);
    };

    return (
        <div className="navigation-bar">
            <header>Judge Girl <span>CMS</span></header>
            {link(currentPathName, '/problems', 'Problems')}
            {link(currentPathName, '/exams', 'Exam')}
            {link(currentPathName, '/students', 'Students')}
            {link(currentPathName, '/admins', 'Admin')}

            <span className="logout" onClick={onLogout}>Logout</span>
        </div>
    );
});

export {NavigationBar};
