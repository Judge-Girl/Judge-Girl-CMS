import './Examinees.css';
import React, {useEffect, useState} from "react";
import {FaRegEdit, FaUserFriends} from 'react-icons/fa'
import {AiOutlineSetting} from 'react-icons/ai'
import {NavLink} from "react-router-dom";
import {withRouter} from "react-router";
import FakeLink from "../commons/FakeLink";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import {AddStudentModal} from "./AddStudentModal";

function link(currentPathName, to, name, Icon, isActive) {
    return (
        <NavLink to={to} className={isActive ? "is-active" : ""}>
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

const useStudentList = () => {
    const [students, setStudents] = useState(undefined);
    const addStudent = (student) => students.push(student);
    return {students, addStudent, setStudents};

};

const Examinees = withRouter(({history}) => {
    const currentPathName = history.location.pathname;

    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const {students, addStudent, setStudents} = useStudentList();

    useEffect(() => {
        if (!students) {
            studentService.getStudents({skip: 0, size: 100})
                .then(students => setStudents(students));
        }
    });

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

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ItemListPage title="Participants"
                              filterItems={["Filter", "Name", "Email"]}
                              onCreateButtonClick={e => setShowAddStudentModal(true)}
                              tableHeaders={["Name", "Email", " "]}
                              tableRowGenerator={{
                                  list: students,
                                  key: (student) => student.id,
                                  data: (student) => [
                                      (<FakeLink content={student.name}/>),
                                      student.email,
                                      ""
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>

                <AddStudentModal show={showAddStudentModal}
                                 onClose={() => setShowAddStudentModal(false)}
                                 onStudentCreated={student => addStudent(student)}/>
            </div>
        </div>
    );
});

export {Examinees};