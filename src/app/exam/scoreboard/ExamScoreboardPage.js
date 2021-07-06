import {useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Spinner} from "../../commons/Spinner";
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {useExamContext} from "../questions/ExamContext";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamSummary from "../score/ExamSummary";
import ChartField from "./ChartField";
import FakeLink from "../../commons/FakeLink";
import {Bar} from "react-chartjs-2";
import {optionsTemplate, dataTemplate} from "./ChartConfigTemplates";
import {examTranscriptService} from "../../../services/services";
import {ExamScoreboardPresenter} from "./ExamScoreboardPresenter";


const ExamScoreboardPage = () => {
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
                .then(examScoreboard => setPresenter(new ExamScoreboardPresenter(examScoreboard)));
    }, [currentExam, examId]);


    if (!currentExam || !presenter) {
        return <Spinner/>;
    }

    return (
        <div className="exam-scoreboard">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExam.name}
                examId={examId}/>
            <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <div style={{
                        width: "fit-content",
                        display: "flex", flexDirection: "column", justifyContent: "flex-start"}}>
                        <div style={{marginBottom: "3em"}}>
                            <TitleLine title="Summary"/>
                            <ExamSummary averageScore={presenter.crossAverage}
                                         maxScore={presenter.sumOfMaxScores}
                                         totalExaminees={presenter.totalExaminees}/>
                        </div>
                        <TitleLine title="Bar Charts"/>
                        {presenter.examSummary.map(data =>
                            <ChartField
                                width={1200}
                                title={
                                    <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                                        <FakeLink>Question: {data.problemId} {data.problemTitle}</FakeLink>
                                        <div>No Submission: {data.chartData.noSubmission} / Average: {data.average}</div>
                                    </div>}
                                charts={[
                                    <Bar type="bar"
                                         options={optionsTemplate("Students", "testcases")}
                                         data={dataTemplate(
                                             data.chartData.testcasesLabels,
                                             data.chartData.testcasesData,
                                             "Students",
                                             {
                                                 backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                                                 borderColor: ['rgba(75, 192, 192, 1)']
                                             }
                                         )}/>,
                                    <Bar type="bar"
                                         options={optionsTemplate("Students", "total pass testcases")}
                                         data={dataTemplate(
                                             data.chartData.totalPassLabels,
                                             data.chartData.totalPassData,
                                             "Students",
                                             {
                                                 backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                                                 borderColor: ['rgba(54, 162, 235, 1)']
                                             }
                                         )}/>
                                ]}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};


export default ExamScoreboardPage;
