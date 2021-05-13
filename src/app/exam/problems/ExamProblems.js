import { useState, useEffect } from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import { Map } from "immutable"

import { examService, problemService, submissionService } from "../../../services/services.js";
import { ThreeDotsButton } from "../../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../../commons/FakeLink.js";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { AddProblemModal } from "../modals/AddProblemModal.js";
import { EditProblemModal } from "../modals/EditProblemModal.js";
import {RejudgeProblemModal} from "../modals/RejudgeProblemModal";
import "./ExamProblems.scss";

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
    const [showEditProblemModal, setShowEditProblemModal] = useState(false);

    const [editingProblem, setEditingProblem] = useState(null);

    const fetchExam = () => {
        examService.getExamOverview(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);

            setExamProblems(exam.questions);
        });
    };

    const buildProblemTitleMap = () => {
        examProblems.forEach(problem => {
            problemService.getProblemById(problem.problemId)
                .then(res => setProblemId2Title(prev => prev.set(problem.problemId, res.title)))
        })
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
    }, [examProblems, redirectURL]);

    const editProblem = (problemId) => {
        const editQuestionPromise = examService.editExamQuestion({examId, problemId});
        editQuestionPromise.then(fetchExam);
        setRedirectURL(`/problems/${problemId}/edit`)
        return editQuestionPromise;
    };

    const dropDownItems = (problemId) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
            setEditingProblem(problemId)
            setShowEditProblemModal(true)
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
            <div className="container" style={{whiteSpace: "nowrap"}}>
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
                                <div className="text-center">{examProblem.maxScore}</div>,
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
            </div>

            <AddProblemModal
                title="Create Question"
                show={showAddProblemModal}
                onClose={() => setShowAddProblemModal(false)}
                onSubmitQuestion={addProblem} />

            <EditProblemModal title={"Edit Question"}
                show={showEditProblemModal}
                question={editingProblem}
                onClose={() => setShowEditProblemModal(false)}
                onSubmitQuestion={editProblem} />
        </div>
    )
}


export default ExamProblems;
