import { ExamInPageNavigationBar } from "./ExamInPageNavigationBar";
import { withRouter } from "react-router";
import { ItemListPage } from "../commons/ItemListPage/ItemListPage.js";
import { examService } from "../../services/services.js";
import { useState } from "react";


const ExamProblems = withRouter(({ history, match }) => {
    const currentPathName = history.location.pathname;
    const [problems, setProblems] = useState([]);

    const examId = match.params.examId;

    examService.getExam(examId).then(exam => {
        setProblems(exam.questions);
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
                        key: (problem) => problem.id,
                        data: (problem) => [
                            1, 2, 3, 4, 5,
                        ]
                    }}
                    showFilterSearchBar={false}
                    tableDataStyle={{ textAlign: "left" }} />
            </div>
        </div>
    )
});

export { ExamProblems };