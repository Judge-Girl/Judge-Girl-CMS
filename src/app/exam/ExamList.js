import './ExamList.scss';
import React, {useCallback, useEffect, useState} from "react";
import {Link, Redirect, Route, Switch, useHistory} from "react-router-dom";
import {examService} from "../../services/services";
import {EXAM_STATUSES} from "../../services/ExamService";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import {displayDate} from "../../utils/utils";
import {CreateExamModal} from "./modals/CreateExamModal";
import {Examinees} from "./participants/Examinees";
import ExamQuestions from "./questions/ExamQuestions";
import {ExamOptions} from "./options/ExamOptions";
import {Spinner} from "../commons/Spinner";
import {ExamContext} from "./questions/ExamContext";
import {TableCell} from "../../utils/TableCell";
import ExamLiveSubmissions from "./submissions/ExamLiveSubmissions";
import ExamScoreboardPage from "./scoreboard/ExamScoreboardPage";
import ExamScorePage from "./score/ExamScorePage";
import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar";

export const useExamList = () => {
    const [exams, setExams] = useState();
    const addExam = (exam) => {
        exams.push(exam);
        setExams(exams);
    };

    return {exams, setExams, addExam};
};

const ExamList = () => {
    const history = useHistory();
    const {exams, setExams} = useExamList();
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [showCreateExamModal, setShowCreateExamModal] = useState(false);
    const updateExams = useCallback(() => setShouldUpdate(true), [setShouldUpdate]);
    const fetchExams = useCallback(() => {
        console.log("fetchExams called.");
        examService.getExams({status: EXAM_STATUSES.ALL})
            .then(setExams);
    }, [setExams]);

    useEffect(() => {
        if (!exams) {
            fetchExams();
        }
    }, [exams, fetchExams]);

    useEffect(() => {
        if (shouldUpdate) {
            fetchExams();
            setShouldUpdate(false);
        }
    }, [shouldUpdate, fetchExams, setShouldUpdate]);

    const onExamCreated = exam => {
        history.push(`/exams/${exam.id}/problems`);
    };

    if (!exams)
        return <Spinner/>;

    return <>
        <Route path="/exams" exact>
            <div className="exam-list font-poppins">
                <ItemListPage title="Exam List"
                              width="1000px"
                              filterItems={["Filter", "Id", "name"]}
                              Button={() =>
                                  <CreateButton onClick={() => setShowCreateExamModal(true)}/>}
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
                                          <Link to={`/exams/${exam.id}/problems`}>
                                              {exam?.name}
                                          </Link>
                                      </TableCell>,
                                      <TableCell>{displayDate(exam?.startTime)}</TableCell>,
                                      <TableCell>{displayDate(exam?.endTime)}</TableCell>,
                                  ]
                              }}/>

                <CreateExamModal show={showCreateExamModal}
                                 onClose={() => setShowCreateExamModal(false)}
                                 onExamCreated={onExamCreated}/>
            </div>
        </Route>
        <ExamContext.Provider value={{exams, updateExams, shouldUpdate}}>
            <Route path="/exams/:examId">
                <ExamInPageNavigationBar/>
            </Route>
            <Switch>
                <Route path="/exams/:examId/problems">
                    <ExamQuestions/>
                </Route>
                <Route path="/exams/:examId/students">
                    <Examinees/>
                </Route>
                <Route path="/exams/:examId/submissions">
                    <ExamLiveSubmissions/>
                </Route>
                <Route path="/exams/:examId/scoreboard">
                    <ExamScoreboardPage/>
                </Route>
                <Route path="/exams/:examId/score">
                    <ExamScorePage/>
                </Route>
                <Route path="/exams/:examId/options">
                    <ExamOptions/>
                </Route>
                <Route path="/exams/:examId/*">
                    <Redirect to="/exams/:examId/problems"/>
                </Route>
            </Switch>
        </ExamContext.Provider>
    </>;
};


export {ExamList}
