
import { useState, useEffect } from "react";
import { withRouter } from "react-router";

import "./ExamProblems.scss";
import { examService } from "../../services/services.js";
import { ThreeDotsButton } from "../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../commons/FakeLink.js";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { AddProblemModal } from "./modals/AddProblemModal.js";

const toCharactorIndex = i => {
    return String.fromCharCode(i + 65);
}

const ExamProblems = withRouter(({ history, match }) => {
    const currentPathName = history.location.pathname;
    const [problems, setProblems] = useState(null);

    const [showAddProblemModal, setShowAddProblemModal] = useState(false);

    const examId = match.params.examId;

    const refetchExam = () => {
        examService.getExam(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);

            setProblems(exam.questions);
        });
    };

    const addProblem = (problemId, scorePercentage, submissionQuota) => {
        const addExamPromise = examService.addExamQuestion({
            examId, problemId,
            score: scorePercentage,
            quota: submissionQuota,
            questionOrder: problems.length,
        });
        addExamPromise.then(refetchExam);
        return addExamPromise;
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
        <div>
            <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"} />

            <div className="container">
                <ItemListPage
                    title="Problems"
                    tableHeaders={["#", "Problem Title", "Score Percentage", "Submission Quota", " "]}
                    tableRowGenerator={{
                        list: problems,
                        key: problem => problem.problemId,
                        data: problem => [
                            toCharactorIndex(problem.questionOrder),
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
                onSubmit={addProblem} />
        </div>
    )
});

export { ExamProblems };