import React, {useState, useEffect, useCallback} from "react";
import {useParams, useRouteMatch} from "react-router-dom";

import { examService, submissionService } from "../../../services/services.js";
import { ThreeDotsButton } from "../../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../../commons/FakeLink.js";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { AddQuestionModal } from "../modals/AddQuestionModal.js";
import { EditQuestionModal } from "../modals/EditQuestionModal.js";
import { RejudgeQuestionModal } from "../modals/RejudgeQuestionModal";
import "./ExamQuestions.scss";
import {useExamContext} from "./ExamContext";
import {Spinner} from "../../commons/Spinner";

const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
}


const ExamQuestions = () => {
    const { url: currentURL } = useRouteMatch()
    const { currentExam, refetchExam } = useExamContext()
    const { examId } = useParams()
    const [examQuestions, setExamQuestions] = useState(null);

    const NOT_SET = -1
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showRejudgeQuestionModal, setShowRejudgeQuestionModal] = useState(NOT_SET);
    const [rejudgeProblemId, setRejudgeProblemId] = useState(NOT_SET)
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(null);


    const fetchExam = useCallback(() => {
        examService.getExamOverview(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
            setExamQuestions(exam.questions);
        });
    }, [examId])

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId)
        }
        if (!examQuestions) {
            fetchExam()
        }
    }, [currentExam, examId, refetchExam, examQuestions, fetchExam]);

    const editQuestion = (questionId) => {
        const editQuestionPromise = examService.editExamQuestion({examId, questionId});
        editQuestionPromise.then(fetchExam);
        return editQuestionPromise;
    };

    const dropDownItems = (examQuestion) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
            setEditingQuestion(examQuestion)
            setShowEditQuestionModal(true)
        }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => {
            setShowRejudgeQuestionModal(examQuestion.problemId)
        }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => {
            examService.deleteExamQuestion({examId, examQuestion})
                .then(res => {
                    console.log(`Calling API: DELETE /api/exams/${examId}/problems/${examQuestion.problemId}`
                        + " and get result:", res)
            })
        }
    }];

    const rejudgeQuestion = (problemId) => {
        setRejudgeProblemId(problemId)
        submissionService.rejudge({examId, problemId})
            .then(res => {
                console.log("Calling Rejudge API: and get result:", res)
                setRejudgeProblemId(NOT_SET)
            })
    }

    const addQuestion = (question) => {
        question.examId = examId;
        question.questionOrder = examQuestions.length;
        return examService.addExamQuestion(question).then(fetchExam);
    };

    if (!currentExam) {
        return <Spinner/>
    }

    return (
        <div className="exam-questions">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExam.name}
                examId={examId}/>
            <div className="container" style={{whiteSpace: "nowrap"}}>
                <ItemListPage
                    title="Questions"
                    tableHeaders={["#", "Question ID", "Question Title", "Score Percentage", "Submission Quota", " "]}
                    tableRowGenerator={{
                        list: examQuestions,
                        key: examQuestion => examQuestion.problemId,
                        data: (examQuestion) => {
                            return [
                                toCharacterIndex(examQuestion.questionOrder),
                                <FakeLink content={examQuestion.problemId} />,
                                <FakeLink content={examQuestion.problemTitle} />,
                                <div className="text-center">{examQuestion.score}</div>,
                                <div className="text-center">{examQuestion.quota}</div>,
                                <div style={{width: "80px", height: "28px"}}>
                                    {rejudgeProblemId === examQuestion.problemId?
                                        <span className="tag" style={{ backgroundColor: "#FFBB00", color:"white" }}>
                                            Rejudging
                                                <span className="waitingForConnection">.</span>
                                                <span className="waitingForConnection2">.</span>
                                                <span className="waitingForConnection3">.</span>
                                        </span>
                                        :
                                        <div className="text-center">
                                            <ThreeDotsButton dropDownItems={dropDownItems(examQuestion)}/>
                                        </div>
                                    }
                                    <RejudgeQuestionModal
                                        show={showRejudgeQuestionModal === examQuestion.problemId}
                                        title="Rejudge The Problem?"
                                        question={examQuestion}
                                        onClose={() => setShowRejudgeQuestionModal(NOT_SET)}
                                        onConfirmRejudge={rejudgeQuestion}/>
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

                <div className="add-question-btn" onClick={() => setShowAddQuestionModal(true)}>
                    <span>Add New Question</span>
                </div>
            </div>

            <AddQuestionModal
                title="Create Question"
                show={showAddQuestionModal}
                onClose={() => setShowAddQuestionModal(false)}
                onSubmitQuestion={addQuestion} />

            <EditQuestionModal title={"Edit Question"}
                               show={showEditQuestionModal}
                               question={editingQuestion}
                               onClose={() => setShowEditQuestionModal(false)}
                               onSubmitQuestion={editQuestion} />
        </div>
    )
}


export default ExamQuestions;
