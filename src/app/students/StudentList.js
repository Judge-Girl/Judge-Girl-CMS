import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateStudentAccountModal} from "./CreateStudentAccountModal";

const useStudentList = () => {
    const [students, setStudents] = useState(undefined);
    const addStudent = (student) => students.push(student);
    return {students, addStudent, setStudents};

};

const StudentList = () => {
    const [showCreateStudentAccountModal, setShowCreateStudentAccountModal] = useState(false);
    const {students, addStudent, setStudents} = useStudentList();

    useEffect(() => {
        if (!students) {
            studentService.getStudents({skip: 0, size: 100})
                .then(students => setStudents(students));
        }
    });
    return (
        <div style={{padding: "40px 100px 20px 100px"}}>
            <ItemListPage title="Student List"
                          filterItems={["Filter", "Name", "Email"]}
                          onCreateButtonClick={e => setShowCreateStudentAccountModal(true)}
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

            <CreateStudentAccountModal show={showCreateStudentAccountModal}
                                       onClose={() => setShowCreateStudentAccountModal(false)}
                                       onStudentCreated={student => addStudent(student)}/>
        </div>
    )
};


export {StudentList};
