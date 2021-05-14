import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaRegEdit, FaUserFriends} from "react-icons/all";
import {useExamContext} from "./problems/ExamContext";

const ExamInPageNavigationBar = function ({currentURL, examName, examId}) {
    const { setCurrentExam: firstParamResetState } = useExamContext()

    return (
        <InPageNavigationBar currentURL={currentURL}
                             path={{
                                 head: "Exam",
                                 tail: examName
                             }}
                             events={{ firstParamResetState }}
                             tabContents={[
                                 {
                                     to: `/exams/${examId}/problems`,
                                     name: 'Problems',
                                     icon: FaRegEdit
                                 },
                                 {
                                     to: `/exams/${examId}/students`,
                                     name: 'Examinees',
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