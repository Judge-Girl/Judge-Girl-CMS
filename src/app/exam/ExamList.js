import * as React from "react";
import {useEffect, useState} from "react";
import {examService} from "../../services/services";
import * as moment from "moment";
import {CreateExamModal} from "./modals/CreateExamModal";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {Link, Route} from "react-router-dom";
import {EXAM_STATUSES} from "../../services/ExamService";
import {CreateButton} from "../commons/buttons/CreateButton";
import './ExamList.css';
import {Examinees} from "./Examinees";
import {ExamProblems} from "./ExamProblems";
import {ExamOptions} from "./options/ExamOptions";


function formatDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  h:mm A');
}

export const useExamList = function () {
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
    useEffect(() => {
        if (!exams || exams.length === 0) {
            examService.getExams({status: EXAM_STATUSES.ALL})
                .then(exams => setExams(exams));
        }
    });

    return (
        <>
            <Route exact path="/exams">
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
                                          <Link to={`/exams/${exam.id}/students`}>{exam.name}</Link>,
                                          formatDate(exam?.startTime),
                                          formatDate(exam?.endTime),
                                      ]
                                  }}/>

                    <CreateExamModal show={showCreateExamModal}
                                     onClose={() => setShowCreateExamModal(false)}
                                     onExamCreated={exam => addExam(exam)}/>
                </div>
            </Route>
            <Route path="/exams/:examId/students">
                <Examinees />
            </Route>
            <Route path="/exams/:examId/problems">
                <ExamProblems />
            </Route>
            <Route path="/exams/:examId/options">
                {
                    exams? <ExamOptions exams={exams}/>: <ExamOptions exams={exams}/>
                }
            </Route>
        </>
    )
};


export {ExamList};
