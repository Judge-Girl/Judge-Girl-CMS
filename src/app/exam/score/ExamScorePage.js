import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import FakeLink from "../../commons/FakeLink";
import {useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useExamContext} from "../questions/ExamContext";
import {Spinner} from "../../commons/Spinner";
import {TableCell} from "../../../utils/TableCell";
import ExamSummary from "./ExamSummary";
import {examTranscriptService} from "../../../services/services";
import {ExamScorePresenter} from "./ExamScorePresenter";


const ExamScorePage = () => {
    const {url: currentURL} = useRouteMatch();
    const {examId} = useParams();
    const {refetchExam, currentExam} = useExamContext();
    const [presenter, setPresenter] = useState(undefined);

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId);
        }
    }, [currentExam, refetchExam, examId]);

    useEffect(() => {
        if (currentExam)
            examTranscriptService.getExamScoreboard(examId)
                .then(examScoreboard => setPresenter(new ExamScorePresenter(examScoreboard)));
    }, [currentExam, examId]);

    if (!currentExam || !presenter) {
        return <Spinner/>;
    }

    return (
        <div className="exam-score">
            <ExamInPageNavigationBar currentURL={currentURL}
                                     examName={currentExam.name}
                                     examId={examId}/>
            <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div className="mt-2" style={{display: "flex", justifyContent: "center"}}>
                    <div className="mt-4 mr-3" style={{width: "fit-content", textAlign: "center"}}>
                        <ExamSummary vertical
                                     averageScore={presenter.crossAverage}
                                     maxScore={presenter.sumOfMaxScores}
                                     totalExaminees={presenter.totalExaminees}/>
                    </div>
                    <ItemListPage
                        width="1000px"
                        tableHeaders={[
                            <TableCell>Name</TableCell>,
                            ...presenter.problemIds.map(problemId => <TableCell>{problemId}</TableCell>),
                            <TableCell>Table Score</TableCell>
                        ]}
                        tableRowGenerator={{
                            list: presenter.examineeRecords,
                            key: examinee => examinee.studentId,
                            data: ({studentName, studentScores, studentTotalScore}) => [
                                <FakeLink>{studentName}</FakeLink>,
                                ...studentScores.map(score => <FakeLink>{score}</FakeLink>),
                                <FakeLink>{studentTotalScore} / {presenter.sumOfMaxScores}</FakeLink>,
                            ]
                        }}
                        showFilterSearchBar={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ExamScorePage
