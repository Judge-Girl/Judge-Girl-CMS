import React, {useEffect, useState} from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar"
import FakeLink from "../../commons/FakeLink";
import {examService} from "../../../services/services";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../../commons/buttons/DropDownButton";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {TextareaModal} from "../../commons/modals/TextareaModal";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton";
import {RemoveConfirmationModal} from "../../commons/modals/RemoveConfirmationModal";
import {Spinner} from "../../commons/Spinner";
import {removeIf} from "../../../utils/array";
import {useExamContext} from "../questions/ExamContext";
import {EmptyCell, TableCell} from "../../../utils/TableCell";


const Examinees = () => {
    const {url: currentURL} = useRouteMatch();
    const {examId} = useParams();
    const {currentExam, refetchExam} = useExamContext()
    const [examinees, setExaminees] = useState(undefined);
    const [selectedExaminee, setSelectedExaminee] = useState(undefined);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);

    const [showRemoveExamineeConfirmationModal, setShowRemoveExamineeConfirmationModal] = useState(false);

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId)
        }
        if (!examinees && currentExam) {
            examService.getExaminees(examId)
                .then(students => setExaminees(students));
        }
    }, [currentExam, examId, examinees, refetchExam]);

    const actionItemsButton = ({examinee}) =>
        <ThreeDotsButton dropDownItems={[
            {
                name: "Remove",
                dangerous: true,
                onClick: () => {
                    setShowRemoveExamineeConfirmationModal(true)
                    setSelectedExaminee(examinee)
                }
            },
        ]}/>

    const addExaminees = async (emails) => {
        await examService.addExaminees(currentExam.id, emails)
            .then(errorList => {
                // TODO: the error should be handled in the future
                console.log(`errorList=${errorList}`);
            })
        examService.getExaminees(examId)
            .then(examinees => {
                // TODO: currently, to avoid "render more hooks than expected" error thrown from React,
                //  setting an empty array is a effective trick, but we need to know the root cause
                //  and use the more proper way instead.
                setExaminees([])
                setExaminees(examinees)
            });
    }

    const removeExaminee = (email) => {
        examService.deleteExaminees(examId, email)
            .then(() => removeExamineeByEmail(email));
    }

    function removeExamineeByEmail(email) {
        removeIf(examinees, examinee => examinee.email === email)
        // TODO: currently, to avoid "render fewer hooks than expected" error thrown from React,
        //  setting an empty array is a effective trick, but we need to know the root cause
        //  and use the more proper way instead.
        setExaminees([])
        setExaminees(examinees)
    }

    if (!currentExam) {
        return <Spinner/>
    }

    return (
        <div className="examinees">
            <ExamInPageNavigationBar currentURL={currentURL}
                                     examName={currentExam.name}
                                     examId={examId}/>
            <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ItemListPage width="1200px"
                                  title="Examinees"
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
                                  tableHeaders={[
                                      <TableCell>Name</TableCell>,
                                      <TableCell>Email</TableCell>,
                                      <EmptyCell/>
                                  ]}
                                  tableRowGenerator={{
                                      list: examinees,
                                      key: (student) => student.id,
                                      data: (student) => [
                                          <FakeLink>{student.name}</FakeLink>,
                                          <TableCell>{student.email}</TableCell>,
                                          <TableCell>{actionItemsButton({examinee: student})}</TableCell>,
                                      ]
                                  }}/>
                </div>

                <TextareaModal title={"Add Students"}
                               body={{
                                   description: "Add examinees to the exam with the examinees’ email.",
                                   Icon: AiOutlineMail,
                                   placeholder: "studentA@example.com\nstudentB@example.com",
                                   remark: "＊One email per line.",
                                   buttonName: "Add"
                               }}
                               show={showAddStudentModal}
                               onClose={() => setShowAddStudentModal(false)}
                               onSubmit={emails => addExaminees(emails)}/>

                <TextareaModal title={"Add Students By Groups"}
                               body={{
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
        </div>
    );
}

export {Examinees};
