import "./ExamQuestions.scss";
import "../../problem/editor/ProblemEditor.scss";
import React, {useCallback, useEffect, useState} from "react";
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
import {DeleteConfirmationModal} from "../../commons/modals/DeleteConfirmationModal";
import {EditorButton} from "../../problem/commons/EditorButton";
import MarkdownEditor from "../../problem/commons/MarkdownEditor";
import MarkdownEditorWriteTab from "../../problem/commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../problem/commons/MarkdownEditorPreviewTab";
import {EditorContext} from "../../problem/commons/MarkdownEditorContext";

const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
};


const ExamQuestions = () => {
    const {url: currentURL} = useRouteMatch();
    const {currentExam, refetchExam} = useExamContext();
    const {examId} = useParams();
    const [questions, setQuestions] = useState(undefined);

    const NOT_SET = -1;
    const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
    const [showRejudgeQuestionModal, setShowRejudgeQuestionModal] = useState(NOT_SET);
    const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(undefined);
    const [rejudgingProblemId, setRejudgeProblemId] = useState(NOT_SET);
    const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState(undefined);
    const [editingState, setEditingState] = useState(false);
    const [examDescription, setExamDescription] = useState(currentExam?.description || 'Press Edit Description to start writing the description. Styling with Markdown is supported.\n');
    const [lastExamDescription, setLastExamDescription] = useState(examDescription);

    const fetchExam = useCallback(() => {
        examService.getExamOverview(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
            setQuestions(exam.questions);
        });
    }, [examId]);

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId);
        }
        if (!questions) {
            fetchExam();
        }
    }, [currentExam, examId, refetchExam, questions, fetchExam]);

    const editQuestion = (question) => {
        const editQuestionPromise = examService.editExamQuestion(question);
        editQuestionPromise.then(fetchExam);
        return editQuestionPromise;
    };

    const deleteQuestion = (question) => {
        examService.deleteExamQuestion(question)
            .then(() => {
                setQuestions(questions.filter(q => q !== question));
                console.log(`Delete question successfully.`);
            });
    };

    const dropDownItems = (question) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
            setEditingQuestion(question);
            setShowEditQuestionModal(true);
        }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => {
            setShowRejudgeQuestionModal(question.problemId);
        }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => {
            setShowDeleteQuestionModal(question);
        }
    }];

    const rejudgeQuestion = (problemId) => {
        setRejudgeProblemId(problemId);
        submissionService.rejudge({examId, problemId})
            .then(res => {
                console.log("Calling Rejudge API: and get result:", res);
                setRejudgeProblemId(NOT_SET);
            })
    };

    const addQuestion = (question) => {
        question.examId = examId;
        question.questionOrder = questions.length;
        return examService.addExamQuestion(question).then(fetchExam);
    };

    const HandleDescriptionButtons = () => {
        return (
            <>
                <EditorButton
                    text={"Save"}
                    buttonColor={"#96D745"}
                    fontColor={"#FFFFFF"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    marginTop={15} marginRight={4}
                    onClick={e => handleDescription(e)}/>
                <EditorButton
                    text={"Cancel"}
                    buttonColor={"#FFFFFF"}
                    fontColor={"#A2A3B1"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    borderColor={"#A2A3B1"}
                    marginTop={15} marginLeft={4}
                    onClick={() => {
                        setEditingState(false);
                        setExamDescription(lastExamDescription);
                    }}/>
            </>
        )
    }

    const EditDescriptionButton = () => {
        return (
            <EditorButton
                text={"Edit Description"}
                buttonColor={"#F2B311"}
                fontColor={"#FFFFFF"}
                width={209} height={33}
                fontSize={15}
                borderRadius={20}
                borderColor={"#F2B311"}
                marginTop={15}
                onClick={() => {
                    setEditingState(true);
                    setLastExamDescription(examDescription);
                }}/>
        )
    }

    const handleDescription = e => {
        e.preventDefault();
        // TODO: empty description notification
        if (examDescription.length === 0) {
            return;
        }

        onExamDescriptionChanged(examDescription);

        setEditingState(false);
    };

    const onExamDescriptionChanged = (description) => {
        if (currentExam.description !== description) {
            examService.updateExam(examId, {
                examId,
                name: currentExam.name,
                startTime: currentExam.startTime,
                endTime: currentExam.endTime,
                description
            }).then(() => refetchExam(examId));
        }
    }

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
                    <div style={{display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "center"}}>
                        <ItemListPage
                            width="1200px"
                            title="Questions"
                            tableHeaders={[
                                <TableCell>#</TableCell>,
                                <TableCell>Question ID</TableCell>,
                                <TableCell>Question Title</TableCell>,
                                <TableCell>Score Percentage</TableCell>,
                                <TableCell>Submission Quota</TableCell>,
                                " "]}
                            tableDataStyle={{height: "60px"}}
                            tableRowGenerator={{
                                list: questions,
                                key: question => `${question.questionOrder}-${question.problemId}`,
                                data: (question) => {
                                    return [
                                        <TableCell>{toCharacterIndex(question.questionOrder)}</TableCell>,
                                        <FakeLink>{question.problemId}</FakeLink>,
                                        <FakeLink>{question.problemTitle}</FakeLink>,
                                        <TableCell>{question.maxScore}</TableCell>,
                                        <TableCell>{question.quota}</TableCell>,
                                        <TableCell>
                                            {rejudgingProblemId === question.problemId ?
                                                <span className="tag"
                                                      style={{
                                                          backgroundColor: "#FFBB00",
                                                          color: "white",
                                                          width: "75px"
                                                      }}>
                                                    Rejudging
                                                    <span className="waitingForConnection">.</span>
                                                    <span className="waitingForConnection2">.</span>
                                                    <span className="waitingForConnection3">.</span>
                                                </span>
                                                :
                                                <div className="text-center" style={{width: "75px"}}>
                                                    <ThreeDotsButton dropDownItems={dropDownItems(question)}/>
                                                </div>
                                            }
                                            <RejudgeQuestionModal
                                                show={showRejudgeQuestionModal === question.problemId}
                                                title="Rejudge The Problem?"
                                                question={question}
                                                onClose={() => setShowRejudgeQuestionModal(NOT_SET)}
                                                onConfirmRejudge={rejudgeQuestion}/>
                                        </TableCell>
                                    ]
                                },
                            }}
                            showFilterSearchBar={false}/>
                        <div className="add-question-btn"
                             onClick={() => setShowAddQuestionModal(true)}
                             style={{alignSelf: "flex-end"}}>
                            <span>Add New Question</span>
                        </div>
                        {/* TODO: Refactoring the scss. */}
                        <div className="problem-editor" style={{padding: "0"}}>
                            <div className="right-bar" style={{width: "1000px"}}>
                                <EditorContext.Provider value={{
                                    markdownText: examDescription,
                                    setMarkdownText: setExamDescription,
                                    markdownTextBackUp: lastExamDescription,
                                    setMarkdownTextBackUp: setLastExamDescription,
                                }}>
                                    <EditDescriptionButton/>
                                    <HandleDescriptionButtons/>
                                {!editingState?
                                    <div className="markdown">
                                        {/* TODO: The prefix "New" will be removed in the next PR. */}
                                        <MarkdownEditorPreviewTab/>
                                    </div>
                                    :
                                    <MarkdownEditor
                                        tabObjects={[
                                            /* TODO: The prefix "New" will be removed in the next PR. */
                                            {title: "Write", component: <MarkdownEditorWriteTab/>},
                                            {title: "Preview", component: <MarkdownEditorPreviewTab/>}
                                        ]}
                                        defaultIndex={1}
                                        isEditing={editingState}/>
                                }
                                </EditorContext.Provider>
                            </div>
                        </div>
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
            {showDeleteQuestionModal ?
                <DeleteConfirmationModal title={"Delete the Question?"}
                                         data={[
                                             {
                                                 title: "Question Title",
                                                 value: showDeleteQuestionModal?.problemTitle
                                             }
                                         ]}
                                         show={showDeleteQuestionModal}
                                         onClose={() => setShowDeleteQuestionModal(undefined)}
                                         onSubmit={() => deleteQuestion(showDeleteQuestionModal)}/> : undefined}

        </div>
    )
};


export default ExamQuestions;
