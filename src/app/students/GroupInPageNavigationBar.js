import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaUserGraduate} from "react-icons/all";

const GroupInPageNavigationBar = function ({currentURL, groupName, groupId}) {

    const onBreadcrumbClickAtIndex = (index) => {
        const BACK_TO_EXAM_LIST = 0;
        switch (index) {
            case BACK_TO_EXAM_LIST:
                console.log("Nothing to do")
                break;
            default:
                console.log("WARNING: onBreadcrumbClickAtIndex index out of range.")
        }
    };

    return (
        <InPageNavigationBar currentURL={currentURL}
                             path={{
                                 head: "Group",
                                 tail: groupName
                             }}
                             onBreadcrumbClickAtIndex={onBreadcrumbClickAtIndex}
                             tabContents={[
                                 {
                                     to: `/groups/${groupId}/members`,
                                     name: 'Members',
                                     icon: FaUserGraduate
                                 },
                                 {
                                     to: `/groups/${groupId}/options`,
                                     name: 'Options',
                                     icon: AiOutlineSetting
                                 }
                             ]}
        />
    )
};

export {GroupInPageNavigationBar};
