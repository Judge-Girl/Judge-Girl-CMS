import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar"
import FakeLink from "../commons/FakeLink";
import {examService} from "../../services/services";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../commons/buttons/DropDownButton";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {AddExamineesModal} from "./modals/AddExamineesModal";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {Spinner} from "../commons/Spinner";

const Examinees = withRouter(({history, match}) => {
        const currentPathName = history.location.pathname;
        const [examinees, setExaminees] = useState(undefined);
        const [selectedExaminee, setSelectedExaminee] = useState(undefined);
        const [exam, setExam] = useState(undefined);
        const [showAddStudentModal, setShowAddStudentModal] = useState(false);
        const [showAddGroupModal, setShowAddGroupModal] = useState(false);
        const [showRemoveExamineeConfirmationModal, setShowRemoveExamineeConfirmationModal] = useState(false);

        const examId = match.params.examId;

        useEffect(() => {
            if (!exam) {
                examService.getExam(examId)
                    .then(exam => setExam(exam))
            }
            if (!examinees && exam) {
                console.log("in effect")
                examService.getExaminees(examId)
                    .then(students => setExaminees(students));
            }
        }, [exam, examId, examinees]);

        const actionItemsButton = ({examinee}) => new ThreeDotsButton({
            dropDownItems: [{
                name: "Remove",
                dangerous: true,
                onClick: () => {
                    setShowRemoveExamineeConfirmationModal(true)
                    setSelectedExaminee(examinee)
                }
            }]
        })

        const addExaminees = async (emails) => {
            await examService.addExaminees(exam.id, emails)
                .then(errorList => {
                    console.log(`errorList=${errorList}`);
                })
            examService.getExaminees(examId)
                .then(students => {
                    // TODO: remove setting empty array and fixed "render more hooks than expected problems"
                    setExaminees([])
                    setExaminees(students)
                });
        }

        const removeExaminee = (email) => {
            examService.deleteExaminees(examId, email)
                .then(() => removeExamineeByEmail(email));
        }

        function removeExamineeByEmail(email) {
            const removed = examinees.find(examinee => examinee.email === email);
            const index = examinees.indexOf(removed);
            if (index > -1) {
                examinees.splice(index, 1);
            }
            // TODO: remove setting empty array and fixed "render less hooks than expected problems"
            setExaminees([])
            setExaminees(examinees)
        }

        return (
            <div>
                {exam ? <ExamInPageNavigationBar currentPathName={currentPathName}
                                                 examName={exam.name}
                                                 examId={examId}/> : <Spinner/>}
                <div style={{padding: "40px 15rem 20px 15rem"}}>
                    <ItemListPage title="Examinees"
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
                                      list: examinees,
                                      key: (student) => student.id,
                                      data: (student) => [
                                          (<FakeLink content={student.name}/>),
                                          student.email,
                                          actionItemsButton({examinee: student})
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>
                </div>

                <AddExamineesModal title={"Add Students"}
                                   content={{
                                       description: "Add examinees to the exam with the examinees’ email.",
                                       Icon: AiOutlineMail,
                                       placeholder: "studentA@example.com\nstudentB@example.com",
                                       remark: "＊One email per line.",
                                       buttonName: "Add"
                                   }}
                                   show={showAddStudentModal}
                                   onClose={() => setShowAddStudentModal(false)}
                                   onSubmit={emails => addExaminees(emails)}/>

                <AddExamineesModal title={"Add Students By Groups"}
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
                                                 value: selectedExaminee?.name
                                             },
                                             {
                                                 title: "Email",
                                                 value: selectedExaminee?.email
                                             }
                                         ]}
                                         show={showRemoveExamineeConfirmationModal}
                                         onClose={() => setShowRemoveExamineeConfirmationModal(false)}
                                         onSubmit={() => removeExaminee(selectedExaminee.email)}/>
            </div>
        );
    }
);

export {Examinees};