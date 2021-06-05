import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiFillYoutube, AiOutlineSetting, FaClipboardList, FaRegEdit, FaUserFriends} from "react-icons/all";
import {useExamContext} from "./questions/ExamContext";

const ExamInPageNavigationBar = function ({currentURL, examName, examId}) {
    const {setCurrentExam, setShouldRedirect} = useExamContext();

    // TODO: improve the design for InPageNavigationBar
    const onBreadcrumbClickAtIndex = (index) => {
        const BACK_TO_EXAM_LIST = 0;
        switch (index) {
            case BACK_TO_EXAM_LIST:
                setCurrentExam(null);
                setShouldRedirect(false);
                break;
            default:
                console.log("WARNING: onBreadcrumbClickAtIndex index out of range.")
        }
    };

    return (
        <InPageNavigationBar currentURL={currentURL}
                             path={{
                                 head: "Exam",
                                 tail: examName
                             }}
                             onBreadcrumbClickAtIndex={onBreadcrumbClickAtIndex}
                             tabContents={[
                                 {
                                     to: `/exams/${examId}/problems`,
                                     name: 'Questions',
                                     icon: FaRegEdit
                                 },
                                 {
                                     to: `/exams/${examId}/students`,
                                     name: 'Examinees',
                                     icon: FaUserFriends
                                 },
                                 {
                                    to: `/exams/${examId}/submissions`,
                                    name: 'Live Submission',
                                    icon: AiFillYoutube
                                 },
                                 {
                                     to: `/exams/${examId}/score`,
                                     name: 'Score',
                                     icon: FaClipboardList
                                 },
                                 {
                                     to: `/exams/${examId}/options`,
                                     name: 'Options',
                                     icon: AiOutlineSetting
                                 }
                             ]}
        />
    )
};

export {ExamInPageNavigationBar};
