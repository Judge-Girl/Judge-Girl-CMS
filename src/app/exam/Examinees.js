import './Examinees.css';
import * as React from "react";
import {FaRegEdit, FaUserFriends} from 'react-icons/fa'
import {AiOutlineSetting} from 'react-icons/ai'
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";

function link(currentPathName, to, name, Icon, isActive) {
    return (
        <NavLink to={to} className={isActive ? "is-active": ""}>
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

const Examinees = withRouter(({history}) => {
    const currentPathName = history.location.pathname;

    return (
        <div>
            <div className="index-container">
                <p className="path">
                    <a> Exam </a><span> / </span><a> 2021 Sample-Exam </a>
                </p>
                <div className="tabs">
                    {link(currentPathName, '/exams/problems', 'Problems', FaRegEdit, true)}
                    {link(currentPathName, '/exams/participants', 'Participants', FaUserFriends, false)}
                    {link(currentPathName, '/exams/options', 'Options', AiOutlineSetting, false)}
                </div>
            </div>
        </div>
    );
});

export {Examinees};