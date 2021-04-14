import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar";
import {withRouter} from "react-router";

const ExamProblems = withRouter(({history}) => {
    const currentPathName = history.location.pathname;
    return (
        <div>
            <ExamInPageNavigationBar currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>
        </div>
    )
});

export {ExamProblems};