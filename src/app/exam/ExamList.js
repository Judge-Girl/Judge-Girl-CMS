import React, {useCallback, useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {examService} from "../../services/services";
import {EXAM_STATUSES} from "../../services/ExamService";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import {displayDate} from "../../utils/utils";
import {CreateExamModal} from "./modals/CreateExamModal";
import {Examinees} from "./participants/Examinees";
import ExamQuestions from "./problems/ExamQuestions";
import {ExamOptions} from "./options/ExamOptions";
import {Spinner} from "../commons/Spinner";
import {ExamContext} from "./problems/ExamContext";
import ExamScore from "./score/ExamScore";
import {TableCell} from "../../utils/TableCell";
import './ExamList.css';


export const useExamList = () => {
    const [exams, setExams] = useState(undefined);
    const addExam = (exam) => {
        exams.push(exam);
        setExams(exams);
    };

    return {exams, setExams, addExam}
};

const ExamList = () => {
    const [showCreateExamModal, setShowCreateExamModal] = useState(false);
    const {exams, setExams, addExam} = useExamList();
    const [currentExam, setCurrentExam] = useState(null);
    const refetchExam = useCallback((examId) => {
        examService.getExams({status: EXAM_STATUSES.ALL})
            .then(exams => {
                setExams(exams)
                setCurrentExamById(exams, examId)
            })
    })

    useEffect(() => {
        if (!exams || exams.length === 0) {
            refetchExam()
        }
    }, [exams, refetchExam]);

    const setCurrentExamById = (exams, examId) => {
        setCurrentExam(exams.find(_exam => _exam.id === parseInt(examId)))
    }

    if (!exams) {
        return <Spinner/>
    }

    return (
        <>
            <Route path="/exams" exact>
                <div className="exam-list font-poppins">
                    <div style={{paddingTop: "20px"}}>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <ItemListPage title="Exam List"
                                          width="1000px"
                                          filterItems={["Filter", "Id", "name"]}
                                          Button={() => new CreateButton({
                                              onCreateButtonClick: () => setShowCreateExamModal(true)
                                          })}
                                          tableHeaders={[
                                              <TableCell>#</TableCell>,
                                              <TableCell>Exam Name</TableCell>,
                                              <TableCell>Start Time</TableCell>,
                                              <TableCell>End Time</TableCell>]}
                                          tableRowGenerator={{
                                              list: exams,
                                              key: (exam) => exam.id,
                                              data: (exam) => [
                                                  <TableCell>{exam?.id}</TableCell>,
                                                  <TableCell>
                                                      <Link to={`/exams/${exam.id}/problems`}
                                                            onClick={() => setCurrentExamById(exams, exam.id)}>
                                                          {exam.name}</Link>
                                                  </TableCell>,
                                                  <TableCell>{displayDate(exam?.startTime)}</TableCell>,
                                                  <TableCell>{displayDate(exam?.endTime)}</TableCell>,
                                              ]
                                          }}/>

                            <CreateExamModal show={showCreateExamModal}
                                             onClose={() => setShowCreateExamModal(false)}
                                             onExamCreated={exam => addExam(exam)}/>
                        </div>
                    </div>
                </div>
            </Route>
            <ExamContext.Provider value={{currentExam, setCurrentExam, refetchExam}}>
                <Route path="/exams/:examId/problems">
                    <ExamQuestions/>
                </Route>
                <Route path="/exams/:examId/score">
                    <ExamScore/>
                </Route>
                <Route path="/exams/:examId/students">
                    <Examinees/>
                </Route>
                <Route path="/exams/:examId/options">
                    <ExamOptions/>
                </Route>
            </ExamContext.Provider>
        </>
    )
};


export {ExamList};
