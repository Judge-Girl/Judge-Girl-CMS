import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateStudentAccountModal} from "./CreateStudentAccountModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {EmptyCell, TableCell} from "../../utils/TableCell";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {DeleteConfirmationModal} from "../commons/modals/DeleteConfirmationModal";

const useStudentList = () => {
    const [students, setStudents] = useState(undefined);
    const addStudent = (student) => students.push(student);
    return {students, addStudent, setStudents};
};

const StudentList = () => {
    const [showCreateStudentAccountModal, setShowCreateStudentAccountModal] = useState(false);
    const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(undefined);
    const {students, addStudent, setStudents} = useStudentList();

    useEffect(() => {
        if (!students) {
            studentService.getStudents({skip: 0, size: 100})
                .then(students => setStudents(students));
        }
    });

    const actionItemsButton = (selectedStudent) =>
        <ThreeDotsButton dropDownItems={[{
            name: "Delete",
            dangerous: true,
            onClick: () => {
                setSelectedStudent(selectedStudent);
                setShowRemoveStudentModal(true);
            }
        }]}/>;

    const deleteStudent = () => {

    }

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
                                          <TableCell>{actionItemsButton(student)}</TableCell>
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>

                    <CreateStudentAccountModal show={showCreateStudentAccountModal}
                                               onClose={() => setShowCreateStudentAccountModal(false)}
                                               onStudentCreated={student => addStudent(student)}/>

                    <DeleteConfirmationModal title={"Delete this student"}
                                             data={[
                                                 {
                                                     title: "Name",
                                                     value: selectedStudent?.name
                                                 },
                                                 {
                                                     title: "Email",
                                                     value: selectedStudent?.email
                                                 }
                                             ]}
                                             show={showRemoveStudentModal}
                                             onClose={() => setShowRemoveStudentModal(false)}
                                             onSubmit={() => deleteStudent()}/>
                </div>
            </div>
        </div>
    )
};


export {StudentList};
