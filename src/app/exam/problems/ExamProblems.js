import React, { useState, useEffect } from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import { Map } from "immutable"

import { examService, problemService, submissionService } from "../../../services/services.js";
import { ThreeDotsButton } from "../../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../../commons/FakeLink.js";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { AddProblemModal } from "../modals/AddProblemModal.js";
import {RejudgeProblemModal} from "../modals/RejudgeProblemModal";
import "./ExamProblems.scss";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamDescriptionEditor from "./ExamDescriptionEditor";


const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
}

const ExamProblems = ({ exams }) => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const currentExamName = exams.find(exam => exam.id === parseInt(examId))?.name
    const [examProblems, setExamProblems] = useState(null);

    const [showAddProblemModal, setShowAddProblemModal] = useState(false);
    const [showRejudgeProblemModal, setShowRejudgeProblemModal] = useState(0);
    const [problemId2Title, setProblemId2Title] = useState(new Map())
    const [redirectURL, setRedirectURL] = useState()
    const [rejudgeProblemId, setRejudgeProblemId] = useState(0)

    const fetchExam = () => {
        examService.getExam(examId)
            .then(exam => {
                exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
                setExamProblems(exam.questions);
            });
    }

    useEffect(() => {
        setRedirectURL(null)
        if (!examProblems) {
            examService.getExam(examId)
                .then(exam => {
                    exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
                    setExamProblems(exam.questions);
                });
        } else {
            examProblems.forEach(problem => {
                problemService.getProblemById(problem.problemId)
                    .then(res => setProblemId2Title(prev => prev.set(problem.problemId, res.title)))
            })
        }
    }, [examId, examProblems, redirectURL]);

    const dropDownItems = (problemId) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
            setRedirectURL(`/problems/${problemId}/edit`)
        }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => {
            setShowRejudgeProblemModal(problemId)
        }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => {
            examService.deleteExamProblem({
                examId: examId,
                problemId: problemId
            }).then(res => console.log("deleted", res))
        }
    }];

    const rejudgeProblem = (problemId) => {
        setShowRejudgeProblemModal(0)
        setRejudgeProblemId(problemId)
        submissionService.submit({
            problemId: problemId,
            langEnvName: "C",
            studentId: "r09900000"
        }).then(res => {
            console.log(res.data)
        })
        setTimeout(() =>
        {
            setRejudgeProblemId(0)
        }, 5000)
    }

    const addProblem = (question) => {
        question.examId = examId;
        question.questionOrder = examProblems.length;
        return examService.addExamQuestion(question).then(res => fetchExam(res));
    };



    if (redirectURL) {
        return <Redirect to={redirectURL}/>
    }

    return (
        <div className="exam-problems">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExamName}
                examId={examId} />
            <div style={{padding: "20px 10% 20px 10%", whiteSpace: "nowrap"}}>
                <ItemListPage
                    title="Problems"
                    tableHeaders={["#", "Problem ID", "Problem Title", "Score %", "Sub. Quota", " "]}
                    tableRowGenerator={{
                        list: examProblems,
                        key: examProblem => examProblem.problemId,
                        data: (examProblem) => {
                            return [
                                toCharacterIndex(examProblem.questionOrder),
                                <FakeLink content={examProblem.problemId} />,
                                <FakeLink content={problemId2Title.get(examProblem.problemId)} />,
                                <div className="text-center">{examProblem.score}</div>,
                                <div className="text-center">{examProblem.quota}</div>,
                                <div style={{width: "80px", height: "28px"}}>
                                    {rejudgeProblemId!==examProblem.problemId?
                                        <div className="text-center">
                                            <ThreeDotsButton dropDownItems={dropDownItems(examProblem.problemId)}/>
                                        </div>
                                        :
                                        <span className="tag is-warning">Rejudging
                                            <span className="waitingForConnection">.</span>
                                            <span className="waitingForConnection2">.</span>
                                            <span className="waitingForConnection3">.</span>
                                        </span>
                                    }
                                    <RejudgeProblemModal
                                        title="Rejudge The Problem?"
                                        problemId={examProblem.problemId}
                                        problemTitle={problemId2Title.get(examProblem.problemId)}
                                        show={showRejudgeProblemModal}
                                        onClose={() => setShowRejudgeProblemModal(0)}
                                        rejudgeProblemId={rejudgeProblemId}
                                        onConfirmRejudge={rejudgeProblem}/>
                                </div>
                            ]
                        },
                    }}
                    showFilterSearchBar={false}
                    tableDataStyle={{
                        textAlign: "left",
                        verticalAlign: "middle",
                        height: "50px",
                        tableLayout: "fixed"
                    }}
                />

                <div className="add-problem-btn" onClick={() => setShowAddProblemModal(true)}>
                    <span>Add New Problem</span>
                </div>

                <br/><br/><br/>

                <TitleLine title="Description"/>

                <ExamDescriptionEditor problemId={rejudgeProblemId}/>
            </div>

            <AddProblemModal
                title="Create Question"
                show={showAddProblemModal}
                onClose={() => setShowAddProblemModal(false)}
                onSubmitQuestion={addProblem} />
        </div>
    )
}


export default ExamProblems;
