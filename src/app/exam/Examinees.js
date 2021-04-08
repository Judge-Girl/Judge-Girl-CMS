import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamHome} from "./ExamHome"
import FakeLink from "../commons/FakeLink";
import {studentService} from "../../services/services";
import {ExamineeListPage} from "./ExamineeListPage";


const useStudentList = () => {
    const [students, setStudents] = useState(undefined);
    const addStudent = (student) => students.push(student);
    return {students, addStudent, setStudents};

};

const Examinees = withRouter(({history}) => {
    const currentPathName = history.location.pathname;

    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);

    const {students, addStudent, setStudents} = useStudentList();

    useEffect(() => {
        if (!students) {
            studentService.getStudents({skip: 0, size: 100})
                .then(students => setStudents(students));
        }
    });

    return (
        <div>
            <ExamHome currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ExamineeListPage title="Participants"
                                  filterItems={["Filter", "Name", "Email"]}
                                  onAddStudentBtnClick={e => setShowAddStudentModal(true)}
                                  onAddGroupBtnClick={e => setShowAddGroupModal(true)}
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
            </div>
        </div>
    );
});

export {Examinees};