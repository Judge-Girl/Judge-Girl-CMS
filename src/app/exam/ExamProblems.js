import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { withRouter } from "react-router";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { examService } from "../../services/services.js";
import { useState, useEffect } from "react";
import FakeLink from "../commons/FakeLink.js";
import { ThreeDotsButton } from "../commons/buttons/ThreeDotsButton.js";


const ExamProblems = withRouter(({ history, match }) => {
    const currentPathName = history.location.pathname;
    const [problems, setProblems] = useState(null);

    const examId = match.params.examId;

    const refetchExam = () => {
        examService.getExam(examId).then(exam => {
            exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);

            setProblems(exam.questions);
        });
    }

    const toCharactorIndex = i => {
        return String.fromCharCode(i + 65);
    }

    useEffect(() => {
        if (!problems) {
            refetchExam();
        }
    });

    const actionItemsButton = ({ problem }) => new ThreeDotsButton({
        dropDownItems: [
            {
                name: "Edit",
                dangerous: false,
                onClick: () => {
                }
            },
            {
                name: "Rejudge",
                dangerous: false,
                onClick: () => {
                }
            },
            {
                name: "Delete",
                dangerous: true,
                onClick: () => {
                }
            }
        ]
    })

    return (
        <div>
            <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"} />

            <div style={{ padding: "40px 15rem 20px 15rem" }}>
                <ItemListPage
                    title="Problems"
                    tableHeaders={["#", "Problem Title", "Score Percentage", "Submission Quota", " "]}
                    tableRowGenerator={{
                        list: problems,
                        key: problem => problem.id,
                        data: problem => [
                            toCharactorIndex(problem.questionOrder),
                            (<FakeLink content={problem.problemId}/>),
                            (<div style={{ textAlign: "center" }}>{problem.score}</div>),
                            (<div style={{ textAlign: "center" }}>{problem.quota}</div>),
                            actionItemsButton({ problem }),
                        ],
                    }}
                    showFilterSearchBar={false}
                    tableDataStyle={{ textAlign: "left" }} />
            </div>
        </div>
    )
});

export { ExamProblems };