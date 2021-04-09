import {ExamHome} from "./ExamHome";
import {withRouter} from "react-router";

const ExamProblems = withRouter(({history}) => {
    const currentPathName = history.location.pathname;
    return (
        <div>
            <ExamHome currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
        </div>
    )
});

export {ExamProblems};