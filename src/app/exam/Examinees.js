import './Examinees.css';
import * as React from "react";
import {FaRegEdit, FaUserFriends} from 'react-icons/fa'
import {AiOutlineSetting} from 'react-icons/ai'
import FakeLink from "../commons/FakeLink";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {NavLink} from "react-router-dom";

function link(currentPathName, to, name, className) {
    return (
        <NavLink to={to} activeClassName={`active-link ${className}`} className={className}
                 isActive={() => currentPathName.startsWith(to)}>{name}</NavLink>
    );
}

const Examinees = function () {
    return (
        <div>
            <div className="index-container">
                <p className="path">
                    <a> Exam </a><span> / </span><a> 2021 Sample-Exam </a>
                </p>
                <div className="tabs">
                    <ul>
                        <li className="is-active">
                            <a><FaRegEdit className="tab-icon"/>Problems</a>
                        </li>
                        <li>
                            <a><FaUserFriends className="tab-icon"/>Participants</a>
                        </li>
                        <li>
                            <a><AiOutlineSetting className="tab-icon"/>Options</a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

    )

};

export {Examinees};