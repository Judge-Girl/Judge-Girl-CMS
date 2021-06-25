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
import {DeleteConfirmationModal} from "../../commons/modals/DeleteConfirmationModal";
import {Spinner} from "../../commons/Spinner";
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

    const fetchExaminees = (examId) => {
        examService.getExaminees(examId)
            .then(examineeStudents => setExaminees(examineeStudents));
    }

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId);
        }
        if (!examinees && currentExam) {
            fetchExaminees(examId);
        }
    }, [currentExam, examId, examinees, refetchExam]);

    const actionItemsButton = ({examinee}) =>
        <ThreeDotsButton dropDownItems={[
            {
                name: "Remove",
                dangerous: true,
                onClick: () => {
                    setShowRemoveExamineeConfirmationModal(true);
                    setSelectedExaminee(examinee);
                }
            },
        ]}/>

    const addExamineesByEmails = async (emails) => {
        examService.addExaminees(examId, emails)
            .then(errorList => {
                // TODO: the error should be handled in the future
                console.log(`errorList=${errorList}`);
                fetchExaminees(examId);
            })

    }

    const addExamineesByGroups = async (groupNames) => {
        examService.addGroupsOfExaminees(examId, groupNames)
            .then(res => fetchExaminees(examId));
    }

    const removeExaminee = (email) => {
        examService.deleteExaminees(examId, email)
            .then(() => setExaminees(examinees.filter(examinee => examinee.email !== email)));
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
                               onSubmit={addExamineesByEmails}/>

                <TextareaModal title={"Add Students By Groups"}
                               body={{
                                   description: "Add groups to the exam with the groups’ name.",
                                   Icon: AiOutlineUsergroupAdd,
                                   placeholder: "group-name-A\ngroup-name-B",
                                   remark: "＊One group name per line.",
                                   buttonName: "Add"
                               }}
                               show={showAddGroupModal}
                               onClose={() => setShowAddGroupModal(false)}
                               onSubmit={addExamineesByGroups}/>

                <DeleteConfirmationModal title={"Remove the Student"}
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
