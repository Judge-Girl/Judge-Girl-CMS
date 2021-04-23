import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar"
import FakeLink from "../commons/FakeLink";
import {examService} from "../../services/services";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../commons/buttons/DropDownButton";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {AddExamineeModal} from "./modals/AddExamineeModal";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {Spinner} from "../commons/Spinner";

const Examinees = withRouter(({history, match}) => {
        const currentPathName = history.location.pathname;
        const [students, setStudents] = useState(undefined);
        const [examinee, setExaminee] = useState(undefined);
        const [exam, setExam] = useState(undefined);
        const [showAddStudentModal, setShowAddStudentModal] = useState(false);
        const [showAddGroupModal, setShowAddGroupModal] = useState(false);
        const [showRemoveExamineeConfirmationModal, setShowRemoveExamineeConfirmationModal] = useState(false);

        const examId = match.params.examId;

        const actionItemsButton = ({examinee}) => new ThreeDotsButton({
            dropDownItems: [
                {
                    name: "Remove",
                    dangerous: true,
                    onClick: () => {
                        setShowRemoveExamineeConfirmationModal(true)
                        setExaminee(examinee)
                    }
                }
            ]
        })

        const addExaminees = (emails) => {
            examService.addExaminees(exam.id, emails)
                .then(errorList => console.log(`errorList=${errorList}`))
        }

        const removeExaminee = (emails) => {
            examService.deleteExaminees(examId, emails).then()
        }

        useEffect(() => {
            if (!exam) {
                examService.getExam(examId)
                    .then(exam => setExam(exam))
            }
            if (!students && exam) {
                examService.getExaminee(examId)
                    .then(students => setStudents(students));
            }
        });

        return (
            <div>
                {exam ? <ExamInPageNavigationBar currentPathName={currentPathName}
                                             examName={exam.name}
                                             examId={examId}/> : <Spinner/>}
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
                                          actionItemsButton({examinee: student})
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>
                </div>

                <AddExamineeModal title={"Add Students"}
                                  content={{
                                         description: "Add students to the exam with the students’ email.",
                                         Icon: AiOutlineMail,
                                         placeholder: "studentA@example.com\nstudentB@example.com",
                                         remark: "＊One email per line.",
                                         buttonName: "Add"
                                     }}
                                  show={showAddStudentModal}
                                  onClose={() => setShowAddStudentModal(false)}
                                  onSubmit={emails => addExaminees(emails)}/>

                <AddExamineeModal title={"Add Students By Groups"}
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
                                                 value: examinee?.name
                                             },
                                             {
                                                 title: "Email",
                                                 value: examinee?.email
                                             }
                                         ]}
                                         show={showRemoveExamineeConfirmationModal}
                                         onClose={() => setShowRemoveExamineeConfirmationModal(false)}
                                         onSubmit={() => removeExaminee(examinee.email)}/>
            </div>
        );
    }
);

export {Examinees};