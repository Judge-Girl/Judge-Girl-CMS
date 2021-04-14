import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar"
import FakeLink from "../commons/FakeLink";
import {studentService} from "../../services/services";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../commons/buttons/DropDownButton";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {AddParticipantModal} from "./modals/AddParticipantModal";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";

const Examinees = withRouter(({history}) => {
        const currentPathName = history.location.pathname;
        const [students, setStudents] = useState(undefined);
        const [showAddStudentModal, setShowAddStudentModal] = useState(false);
        const [showAddGroupModal, setShowAddGroupModal] = useState(false);
        const [showRemoveExamineeConfirmationModal, setShowRemoveExamineeConfirmationModal] = useState(false);


        const actionItemsButton = () => new ThreeDotsButton({
            dropDownItems: [
                {
                    name: "Remove",
                    dangerous: true,
                    onClick: () => setShowRemoveExamineeConfirmationModal(true)
                }
            ]
        })

        useEffect(() => {
            if (!students) {
                studentService.getStudents({skip: 0, size: 100})
                    .then(students => setStudents(students));
            }
        });

        return (
            <div>
                <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
                <div style={{padding: "40px 15rem 20px 15rem"}}>
                    <ItemListPage title="Participants"
                                  filterItems={["Filter", "Name", "Email"]}
                                  Button={() => new DropDownBtn({
                                      buttonName: '+ People',
                                      dropDownItems: [
                                          {
                                              name: "Student",
                                              onClick: () => setShowAddStudentModal(true)
                                          },
                                          {
                                              name: "Group",
                                              onClick: () => setShowAddGroupModal(true)
                                          }
                                      ]
                                  })}
                                  tableHeaders={["Name", "Email", " "]}
                                  tableRowGenerator={{
                                      list: students,
                                      key: (student) => student.id,
                                      data: (student) => [
                                          (<FakeLink content={student.name}/>),
                                          student.email,
                                          actionItemsButton()
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>
                </div>

                <AddParticipantModal title={"Add Students"}
                                     content={{
                                         description: "Add students to the exam with the students’ email.",
                                         Icon: AiOutlineMail,
                                         placeholder: "studentA@example.com\nstudentB@example.com",
                                         remark: "＊One email per line.",
                                         buttonName: "Add"
                                     }}
                                     show={showAddStudentModal}
                                     onClose={() => setShowAddStudentModal(false)}/>

                <AddParticipantModal title={"Add Students By Groups"}
                                     content={{
                                         description: "Add groups to the exam with the groups’ name.",
                                         Icon: AiOutlineUsergroupAdd,
                                         placeholder: "group-name-A\ngroup-name-B",
                                         remark: "＊One group name per line.",
                                         buttonName: "Add"
                                     }}
                                     show={showAddGroupModal}
                                     onClose={() => setShowAddGroupModal(false)}/>

                <RemoveConfirmationModal title={"Remove the Student"}
                                         data={[
                                             {
                                                 title: "Name",
                                                 value: "chaoyu"
                                             },
                                             {
                                                 title: "Email",
                                                 value: "chaoyu@email.com"

                                             }]}
                                         show={showRemoveExamineeConfirmationModal}
                                         onClose={() => setShowRemoveExamineeConfirmationModal(false)}/>
            </div>
        );
    }
);

export {Examinees};