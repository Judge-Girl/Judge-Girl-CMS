import { useState, useEffect } from "react";
import {useParams, useRouteMatch} from "react-router-dom";

import "./ExamProblems.scss";
import { examService } from "../../services/services.js";
import { ThreeDotsButton } from "../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../commons/FakeLink.js";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { AddProblemModal } from "./modals/AddProblemModal.js";

const toCharacterIndex = i => {
    return String.fromCharCode(i + 65);
}

const ExamProblems = ({ exams }) => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const currentExamName = exams.find(exam => exam.id === parseInt(examId))?.name
    const [problems, setProblems] = useState(null);

    const [showAddProblemModal, setShowAddProblemModal] = useState(false);

    const refetchExam = () => {
        examService.getExam(examId).then(exam => {
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

    const dropDownItems = [{
        name: "Edit",
        dangerous: false,
        onClick: () => { }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => { }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => { }
    }];


    useEffect(() => {
        if (!problems) {
            refetchExam();
        }
    });

    return (
        <div class="exam-problems">
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
                            (<FakeLink content={problem.problemId} />),
                            (<div className="text-center">{problem.score}</div>),
                            (<div className="text-center">{problem.quota}</div>),
                            (<ThreeDotsButton dropDownItems={dropDownItems} />),
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
        </div>
    )
}


export default ExamProblems;
