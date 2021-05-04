import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaRegEdit, FaUserFriends} from "react-icons/all";

const ExamInPageNavigationBar = function ({currentURL, examName, examId}) {
    return (
        <InPageNavigationBar currentPathName={currentURL}
                             path={{
                                 head: "Exam",
                                 tail: examName
                             }}
                             tabContents={[
                                 {
                                     to: `/exams/${examId}/problems`,
                                     name: 'Problems',
                                     icon: FaRegEdit
                                 },
                                 {
                                     to: `/exams/${examId}/students`,
                                     name: 'Participants',
                                     icon: FaUserFriends
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