import { useState, useEffect } from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import "./ExamProblems.scss";
import { examService } from "../../services/services.js";
import { ThreeDotsButton } from "../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../commons/FakeLink.js";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { AddProblemModal } from "./modals/AddProblemModal.js";
import { EditProblemModal } from "./modals/EditProblemModal.js";

const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
}


const ExamProblems = ({ exams }) => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const currentExamName = exams.find(exam => exam.id === parseInt(examId))?.name
    const [problems, setProblems] = useState(null);

    const [showAddProblemModal, setShowAddProblemModal] = useState(false);
    const [showEditProblemModal, setShowEditProblemModal] = useState(false);

    const [editingProblem, setEditingProblem] = useState(null);

    const createThreeDotButton = (problem) => {
        return (<ThreeDotsButton dropDownItems={[{
            name: "Edit",
            dangerous: false,
            onClick: () => { setEditingProblem(problem); setShowEditProblemModal(true); },
        }, {
            name: "Rejudge",
            dangerous: false,
            onClick: () => { },
        }, {
            name: "Delete",
            dangerous: true,
            onClick: () => { },
        }]} />)
    }

    const refetchExam = () => {
        examService.getExamOverview(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);

            setProblems(exam.questions);
        });
    };

    const addProblem = (question) => {
        question.examId = examId;
        question.questionOrder = problems.length;

        const addQuestionPromise = examService.addExamQuestion(question);
        addQuestionPromise.then(refetchExam);
        return addQuestionPromise;
    };

    const editProblem = (question) => {
        const editQuestionPromise = examService.editExamQuestion(question);
        editQuestionPromise.then(refetchExam);
        return editQuestionPromise;
    };

    useEffect(() => {
        if (!problems) {
            refetchExam();
        }
    });

    return (
        <div className="exam-problems">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExamName}
                examId={examId} />

            <div className="container">
                <ItemListPage
                    title="Problems"
                    tableHeaders={["#", "Problem Title", "Score Percentage", "Submission Quota", " "]}
                    tableRowGenerator={{
                        list: problems,
                        key: problem => problem.problemId,
                        data: problem => [
                            toCharacterIndex(problem.questionOrder),
                            (<FakeLink content={`${problem.problemId} ${problem.problemTitle}`} />),
                            (<div className="text-center">{problem.maxScore}</div>),
                            (<div className="text-center">{problem.quota}</div>),
                            createThreeDotButton(problem),
                        ],
                    }}
                    showFilterSearchBar={false}
                    tableDataStyle={{ textAlign: "left" }} />

                <div className="add-problem-btn" onClick={() => setShowAddProblemModal(true)}>
                    <span>
                        Add New Problem
                    </span>
                </div>
            </div>

            <AddProblemModal title={"Create Question"}
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
