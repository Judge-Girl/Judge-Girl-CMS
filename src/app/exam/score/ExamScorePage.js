import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../commons/Spinner";
import ExamSummary from "./ExamSummary";
import {examService, examTranscriptService} from "../../../services/services";
import {ExamScorePresenter} from "./ExamScorePresenter";
import './ExamScorePage.scss';

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

    const onButtonExportCSVClick = (examId) => {
        examService.getExamTranscriptCsvFile(examId)
        .then((res) => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'ExamTranscript.csv');
            link.click();
        });
    };

    return (
        <div className="exam-score">
            <div className="exam-score-font-poppins">
                <div className="exam-score-mt-2">
                    <div className="exam-score-mr-3">
                        <ExamSummary vertical
                                averageScore={presenter.crossAverage}
                                maxScore={presenter.sumOfMaxScores}
                                totalExaminees={presenter.totalExaminees} />
                            <button className="export-blue-btn"
                                onClick={() => onButtonExportCSVClick(examId)}>
                                Export CSV
                            </button>
                    </div>
                    <ItemListPage
                        width="1000px"
                        tableHeaders={[
                            "Name",
                            ...presenter.problemIds.map(problemId => `${problemId}`),
                            "Table Score"
                        ]}
                        tableRowGenerator={{
                            list: presenter.examineeRecords,
                            key: examinee => examinee.studentId,
                            data: ({studentName, studentScores, studentTotalScore}) => [
                                <span>{studentName}</span>,
                                ...studentScores.map(score => <span>{score}</span>),
                                <span>{studentTotalScore} / {presenter.sumOfMaxScores}</span>,
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
