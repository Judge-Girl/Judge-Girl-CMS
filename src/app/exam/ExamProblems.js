
import { useState, useEffect } from "react";
import { withRouter } from "react-router";

import { examService } from "../../services/services.js";
import { ThreeDotsButton } from "../commons/buttons/ThreeDotsButton.js";
import FakeLink from "../commons/FakeLink.js";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { AddProblemModal } from "./modals/AddProblemModal.js";

const toCharactorIndex = i => {
    return String.fromCharCode(i + 65);
}

const addProblemBtnStyle = {
    backgroundColor: "#7ECA1D",
    boxShadow: "1px 3px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "50px",
    float: "right",
    display: "inline",
    margin: "1rem 0",
    padding: "5px 20px",
    cursor: "pointer",
};

const addProblemTextStyle = {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "30px",
};

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
        examService.addExamQuestion({
            examId, problemId,
            score: scorePercentage,
            quota: submissionQuota,
            questionOrder: problems.length,
        }).then(refetchExam);
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

            <div style={{ padding: "40px 15rem 20px 15rem" }}>
                <ItemListPage
                    title="Problems"
                    tableHeaders={["#", "Problem Title", "Score Percentage", "Submission Quota", " "]}
                    tableRowGenerator={{
                        list: problems,
                        key: problem => problem.problemId,
                        data: problem => [
                            toCharactorIndex(problem.questionOrder),
                            (<FakeLink content={problem.problemId} />),
                            (<div style={{ textAlign: "center" }}>{problem.score}</div>),
                            (<div style={{ textAlign: "center" }}>{problem.quota}</div>),
                            (<ThreeDotsButton dropDownItems={dropDownItems} />),
                        ],
                    }}
                    showFilterSearchBar={false}
                    tableDataStyle={{ textAlign: "left" }} />

                <div style={addProblemBtnStyle} onClick={() => setShowAddProblemModal(true)}>
                    <span style={addProblemTextStyle}>
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