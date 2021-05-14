import React, {useEffect, useState} from "react";
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
import './ExamList.css';
import {Spinner} from "../commons/Spinner";
import {ExamContext} from "./problems/ExamContext";
import ExamScore from "./score/ExamScore";


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

    useEffect(() => {
        if (!exams || exams.length === 0) {
            examService.getExams({status: EXAM_STATUSES.ALL})
                .then(exams => setExams(exams));
        }
    });

    if (!exams) {
        return (
            <Spinner/>
        )
    }

    return (
        <>
            <Route path="/exams" exact>
                <div className="container font-poppins">
                    <ItemListPage title="Exam List"
                                  filterItems={["Filter", "Id", "name"]}
                                  Button={() => new CreateButton({
                                      onCreateButtonClick: () => setShowCreateExamModal(true)
                                  })}
                                  tableHeaders={["#", "Exam Name", "Start Time", "End Time"]}
                                  tableRowGenerator={{
                                      list: exams,
                                      key: (exam) => exam.id,
                                      data: (exam) => [
                                          exam?.id,
                                          <Link to={`/exams/${exam.id}/students`}
                                                onClick={() => {
                                                    setCurrentExam(exams.find(_exam => _exam.id === exam.id))
                                                }}>
                                              {exam.name}
                                          </Link>,
                                          displayDate(exam?.startTime),
                                          displayDate(exam?.endTime),
                                      ]
                                  }}/>

                    <CreateExamModal show={showCreateExamModal}
                                     onClose={() => setShowCreateExamModal(false)}
                                     onExamCreated={exam => addExam(exam)}/>
                </div>
            </Route>
            <ExamContext.Provider value={{currentExam, setCurrentExam}}>
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
