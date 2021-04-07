import './ExamHome.scss'
import {FaRegEdit, FaUserFriends} from "react-icons/fa";
import {AiOutlineSetting} from "react-icons/ai";
import {NavLink} from "react-router-dom";

function link(currentPathName, to, name, Icon, isActive) {
    return (
        <NavLink to={to} className={isActive ? "is-active" : ""}>
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

const ExamHome = function ({currentPathName}) {
    return (
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
    )
};

export {ExamHome};