import React, {useState, useEffect, useCallback} from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import {examService, submissionService} from "../../../services/services.js";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../../commons/FakeLink.js";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage.js";
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {AddQuestionModal} from "../modals/AddQuestionModal.js";
import {EditQuestionModal} from "../modals/EditQuestionModal.js";
import {RejudgeQuestionModal} from "../modals/RejudgeQuestionModal";
import {useExamContext} from "./ExamContext";
import {Spinner} from "../../commons/Spinner";
import {TableCell} from "../../../utils/TableCell";
import ExamDescriptionEditor from "./ExamDescriptionEditor";
import "./ExamQuestions.scss";

const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
}


const ExamQuestions = () => {
    const {url: currentURL} = useRouteMatch()
    const {currentExam, refetchExam} = useExamContext()
    const {examId} = useParams()
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
            <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <div style={{
                        display: "flex", flexDirection: "column",
                        justifyContent: "flex-start", alignItems: "center",
                    }}>
                        <div style={{
                            display: "flex", flexDirection: "column",
                            justifyContent: "flex-start", alignItems: "flex-end",
                        }}>
                            <ItemListPage
                                width="1200px"
                                title="Questions"
                                tableHeaders={[
                                    <TableCell>#</TableCell>,
                                    <TableCell>Question ID</TableCell>,
                                    <TableCell>Question Title</TableCell>,
                                    <TableCell>Score Percentage</TableCell>,
                                    <TableCell>Submission Quota</TableCell>, " "]}
                                tableDataStyle={{height: "60px"}}
                                tableRowGenerator={{
                                    list: examQuestions,
                                    key: examQuestion => examQuestion.problemId,
                                    data: (examQuestion) => {
                                        return [
                                            <TableCell>{toCharacterIndex(examQuestion.questionOrder)}</TableCell>,
                                            <FakeLink>{examQuestion.problemId}</FakeLink>,
                                            <FakeLink>{examQuestion.problemTitle}</FakeLink>,
                                            <TableCell>{examQuestion.score}</TableCell>,
                                            <TableCell>{examQuestion.quota}</TableCell>,
                                            <TableCell>
                                                {rejudgeProblemId === examQuestion.problemId ?
                                                    <span className="tag"
                                                          style={{backgroundColor: "#FFBB00", color: "white"}}>
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
                                            </TableCell>
                                        ]
                                    },
                                }}
                                showFilterSearchBar={false}/>
                            <div className="add-question-btn"
                                 onClick={() => setShowAddQuestionModal(true)}>
                                <span>Add New Question</span>
                            </div>
                        </div>
                        <ExamDescriptionEditor style={{backgroundColor: "var(--background)", width: "1200px"}}/>
                    </div>
                </div>
            </div>

            <AddQuestionModal
                title="Create Question"
                show={showAddQuestionModal}
                onClose={() => setShowAddQuestionModal(false)}
                onSubmitQuestion={addQuestion}/>

            <EditQuestionModal title={"Edit Question"}
                               show={showEditQuestionModal}
                               question={editingQuestion}
                               onClose={() => setShowEditQuestionModal(false)}
                               onSubmitQuestion={editQuestion}/>
        </div>
    )
}


export default ExamQuestions;
