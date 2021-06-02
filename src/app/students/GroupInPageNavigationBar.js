import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaUserGraduate} from "react-icons/all";

const GroupInPageNavigationBar = function ({currentURL, groupName, groupId}) {

    // TODO: a better design for InPageNavigationBar
    const onBreadcrumbClickAtIndex = (index) => {
        const BACK_TO_GROUP_LIST = 0;
        switch (index) {
            case BACK_TO_GROUP_LIST:
                console.log("nothing")
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
