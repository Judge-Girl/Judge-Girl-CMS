import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaRegEdit, FaUserFriends} from "react-icons/all";

const ExamHome = function ({currentPathName, examName}) {
    return (
        <InPageNavigationBar currentPathName={currentPathName}
                             path={{
                                 head: "Exam",
                                 tail: examName
                             }}
                             tabContents={[
                                 {
                                     to: '/exams/1/problems',
                                     name: 'Problems',
                                     icon: FaRegEdit
                                 },
                                 {
                                     to: '/exams/1/students',
                                     name: 'Participants',
                                     icon: FaUserFriends
                                 },
                                 {
                                     to: '/exams/1/options',
                                     name: 'Options',
                                     icon: AiOutlineSetting
                                 }
                             ]}
        />
    )
};

export {ExamHome};