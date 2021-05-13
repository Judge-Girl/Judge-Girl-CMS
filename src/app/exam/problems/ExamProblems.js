import {useState, useEffect, useCallback} from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import { examService, submissionService } from "../../../services/services.js";
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
    const [rejudgeProblemId, setRejudgeProblemId] = useState(0)
    const [showEditProblemModal, setShowEditProblemModal] = useState(false);

    const [editingProblem, setEditingProblem] = useState(null);

    const fetchExam = useCallback(() => {
        examService.getExamOverview(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
            setExamProblems(exam.questions);
        });
    }, [examId])

    useEffect(() => {
        if (!examProblems) {
            fetchExam()
        }
    }, [examProblems, fetchExam]);

    const editProblem = (problemId) => {
        const editQuestionPromise = examService.editExamQuestion({examId, problemId});
        editQuestionPromise.then(fetchExam);
        return editQuestionPromise;
    };

    const dropDownItems = (examProblem) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
            setEditingProblem(examProblem)
            setShowEditProblemModal(true)
        }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => {
            setShowRejudgeProblemModal(examProblem.problemId)
        }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => {
            examService.deleteExamProblem({
                examId: examId,
                problemId: examProblem
            }).then(res => console.log("deleted", res))
        }
    }];

    const rejudgeProblem = (problemId) => {
        setShowRejudgeProblemModal(0)
        setRejudgeProblemId(problemId)
        submissionService.rejudge({
            examId: examId,
            problemId: problemId
        }).then(res => {
            console.log(res)
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
                                <FakeLink content={examProblem.problemTitle} />,
                                <div className="text-center">{examProblem.score}</div>,
                                <div className="text-center">{examProblem.quota}</div>,
                                <div style={{width: "80px", height: "28px"}}>
                                    {rejudgeProblemId!==examProblem.problemId?
                                        <div className="text-center">
                                            <ThreeDotsButton dropDownItems={dropDownItems(examProblem)}/>
                                        </div>
                                        :
                                        <span className="tag" style={{ backgroundColor: "#FFBB00", color:"white" }}>Rejudging
                                            <span className="waitingForConnection">.</span>
                                            <span className="waitingForConnection2">.</span>
                                            <span className="waitingForConnection3">.</span>
                                        </span>
                                    }
                                    <RejudgeProblemModal
                                        title="Rejudge The Problem?"
                                        problemId={examProblem.problemId}
                                        problemTitle={examProblem.problemTitle}
                                        problem={examProblem}
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
