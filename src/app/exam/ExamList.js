import {useEffect, useState} from "react";
import {Link, Route} from "react-router-dom";
import {examService} from "../../services/services";
import {EXAM_STATUSES} from "../../services/ExamService";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import {formatDate} from "../../utils/utils";
import {CreateExamModal} from "./modals/CreateExamModal";
import {Examinees} from "./Examinees";
import {ExamProblems} from "./ExamProblems";
import {ExamOptions} from "./options/ExamOptions";
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

    useEffect(() => {
        if (!exams || exams.length === 0) {
            examService.getExams({status: EXAM_STATUSES.ALL})
                .then(exams => setExams(exams));
        }
    });

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
            <Route path="/exams/:examId/options">{exams?
                <ExamOptions exams={exams}/>
                    : <ExamOptions exams={exams}/>}
            </Route>
        </>
    )
};


export {ExamList};
