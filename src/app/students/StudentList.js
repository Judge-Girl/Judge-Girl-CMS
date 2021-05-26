import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateStudentAccountModal} from "./CreateStudentAccountModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {EmptyCell, TableCell} from "../../utils/TableCell";

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
        <div className="student-list font-poppins">
            <div style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ItemListPage title="Student List"
                                  width="700px"
                                  filterItems={["Filter", "Name", "Email"]}
                                  Button={() => <CreateButton onClick={() =>
                                      setShowCreateStudentAccountModal(true)}/>}
                                  tableHeaders={[
                                      <TableCell>Name</TableCell>,
                                      <TableCell>Email</TableCell>,
                                      <EmptyCell/>
                                  ]}
                                  tableRowGenerator={{
                                      list: students,
                                      key: (student) => student.id,
                                      data: (student) => [
                                          <FakeLink>{student.name}</FakeLink>,
                                          <FakeLink>{student.email}</FakeLink>,
                                          <EmptyCell/>
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>

                    <CreateStudentAccountModal show={showCreateStudentAccountModal}
                                               onClose={() => setShowCreateStudentAccountModal(false)}
                                               onStudentCreated={student => addStudent(student)}/>
                </div>
            </div>
        </div>
    )
};


export {StudentList};
