import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamHome} from "./ExamHome"
import FakeLink from "../commons/FakeLink";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import {AddStudentModal} from "./modal/AddStudentModal";
import {AddGroupModal} from "./modal/AddGroupModal";


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
            <ExamHome currentPathName={currentPathName}/>

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ItemListPage title="Participants"
                              filterItems={["Filter", "Name", "Email"]}
                              onCreateButtonClick={e => setShowAddGroupModal(true)}
                              tableHeaders={["Name", "Email", " "]}
                              tableRowGenerator={{
                                  list: students,
                                  key: (student) => student.id,
                                  data: (student) => [
                                      (<FakeLink content={student.name}/>),
                                      student.email,
                                      ""
                                  ],
                                  a:"123"
                              }}
                              tableDataStyle={{textAlign: "left"}}/>

                <AddStudentModal show={showAddStudentModal}
                                 onClose={() => setShowAddStudentModal(false)}
                                 onStudentCreated={student => addStudent(student)}/>

                <AddGroupModal show={showAddGroupModal}
                                 onClose={() => setShowAddGroupModal(false)}
                                 onStudentCreated={student => addStudent(student)}/>
            </div>
        </div>
    );
});

export {Examinees};