import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateStudentAccountModal} from "./CreateStudentAccountModal";
import {CreateButton} from "../commons/buttons/CreateButton";

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
        <div style={{padding: "20px 100px 20px 100px"}}>
            <div className="container font-poppins">
            <ItemListPage title="Student List"
                          filterItems={["Filter", "Name", "Email"]}
                          Button={() => new CreateButton({
                              onCreateButtonClick: () => setShowCreateStudentAccountModal(true)
                          })}
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

            <CreateStudentAccountModal show={showCreateStudentAccountModal}
                                       onClose={() => setShowCreateStudentAccountModal(false)}
                                       onStudentCreated={student => addStudent(student)}/>
        </div>
    )
};


export {StudentList};
