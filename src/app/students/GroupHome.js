import {InPageNavigationBar} from "../commons/IndexBanner/InPageNavigationBar";
import {AiOutlineSetting, FaUserGraduate} from "react-icons/all";

const GroupHome = function ({currentPathName, groupName, groupId}) {
    return (
        <InPageNavigationBar currentPathName={currentPathName}
                             path={{
                                 head: "Group",
                                 tail: groupName
                             }}
                             tabContents={[
                                 {
                                     to: `/groups/${groupId}/students`,
                                     name: 'Students',
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

export {GroupHome};