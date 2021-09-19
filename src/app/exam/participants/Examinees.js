import React, {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import FakeLink from "../../commons/FakeLink";
import {examService} from "../../../services/services";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../../commons/buttons/DropDownButton";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {TextareaModal} from "../../commons/modals/TextareaModal";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton";
import {DeleteConfirmationModal} from "../../commons/modals/DeleteConfirmationModal";
import {Spinner} from "../../commons/Spinner";
import {EmptyCell, TableCell} from "../../../utils/TableCell";


const Examinees = () => {
    const {examId} = useParams();
    const [exam, setExam] = useState(undefined);
    const [examinees, setExaminees] = useState(undefined);
    const [selectedExaminee, setSelectedExaminee] = useState(undefined);
    const [showAddStudentModal, setShowAddStudentModal] = useState(false);
    const [showAddGroupModal, setShowAddGroupModal] = useState(false);
    const [showRemoveExamineeConfirmationModal, setShowRemoveExamineeConfirmationModal] = useState(false);

    const fetchExaminees = useCallback(() => {
        examService.getExaminees(examId)
            .then(setExaminees);
    }, [examId, setExaminees]);
    useEffect(() => {
        if (!exam) {
            examService.getExam(examId)
                .then(setExam)
                .then(fetchExaminees);
        }
    }, [exam, examId, setExam, fetchExaminees]);

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
        ]}/>;

    const addExamineesByEmails = async (emails) => {
        examService.addExaminees(examId, emails)
            .then(errorList => {
                // TODO: the error should be handled in the future
                console.log(`errorList=${errorList}`);
                fetchExaminees();
            });
    };

    const addExamineesByGroups = async (groupNames) => {
        examService.addGroupsOfExaminees(examId, groupNames)
            .then(fetchExaminees);
    };

    const removeExaminee = (email) => {
        examService.deleteExaminees(examId, email)
            .then(fetchExaminees);
    };

    if (!exam || !examinees) {
        return <Spinner/>;
    }

    return (
        <div className="examinees">
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
};

export {Examinees};
