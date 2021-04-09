import './ExamHome.scss'
import {FaRegEdit, FaUserFriends} from "react-icons/fa";
import {AiOutlineSetting} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import FakeLink from "../commons/FakeLink";

function link(currentPathName, to, name, Icon) {
    return (
        <NavLink to={to} activeClassName="is-active">
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

const ExamHome = function ({currentPathName, examName}) {
    return (
        <div className="index-container">
            <p className="path">
                <FakeLink content={"Exam"}/><span> / </span><FakeLink content={examName}/>
            </p>
            <div className="tabs">
                {link(currentPathName, '/exams/1/problems', 'Problems', FaRegEdit)}
                {link(currentPathName, '/exams/1/students', 'Participants', FaUserFriends)}
                {link(currentPathName, '/exams/1/options', 'Options', AiOutlineSetting)}
            </div>
        </div>
    )
};

export {ExamHome};