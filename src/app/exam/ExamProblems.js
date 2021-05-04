import {ExamInPageNavigationBar} from "./ExamInPageNavigationBar";
import {useParams, useRouteMatch} from "react-router-dom";

const ExamProblems = ({ exams }) => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const currentExamName = exams.find(exam => exam.id === parseInt(examId)).name

    return (
        <div>
            <ExamInPageNavigationBar
                currentPathName={currentURL}
                examName={currentExamName}
                examId={examId} />
        </div>
    )
}

export default ExamProblems;
