import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiFillYoutube} from "react-icons/all";

const HomeworkPageNavigationBar = function ({currentURL, homeworkName, homeworkId}) {
    return (
        <InPageNavigationBar currentURL={currentURL}
                             path={{
                                 head: "Homework",
                                 tail: homeworkName
                             }}
                             onBreadcrumbClickAtIndex={null}
                             tabContents={[
                                 {
                                     to: `/homework/${homeworkId}/homework`,
                                     name: 'Progress',
                                     icon: AiFillYoutube
                                 }
                             ]}
        />
    )
};

export {HomeworkPageNavigationBar};
