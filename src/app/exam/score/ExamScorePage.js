import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import FakeLink from "../../commons/FakeLink";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../commons/Spinner";
import {TableCell} from "../../../utils/TableCell";
import ExamSummary from "./ExamSummary";
import {examService, examTranscriptService} from "../../../services/services";
import {ExamScorePresenter} from "./ExamScorePresenter";


const ExamScorePage = () => {
    const {examId} = useParams();
    const [presenter, setPresenter] = useState(undefined);
    const [exam, setExam] = useState(undefined);

    useEffect(() => {
        if (!exam) {
            examService.getExam(examId)
                .then(setExam);
        }
    }, [exam, examId, setExam]);

    useEffect(() => {
        if (exam) {
            const subscription = examTranscriptService.pollingExamScoreboard(examId,
                examScoreboard => setPresenter(new ExamScorePresenter(examScoreboard)));
            return () => subscription.unsubscribe();
        }
    }, [exam, setPresenter, examId]);

    if (!exam || !presenter) {
        return <Spinner/>;
    }

    return (
        <div className="exam-score">
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
};

export default ExamScorePage
