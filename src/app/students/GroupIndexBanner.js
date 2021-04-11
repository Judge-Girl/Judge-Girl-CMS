import {IndexBanner} from "../commons/IndexBanner/IndexBanner";
import {AiOutlineSetting, FaUserGraduate} from "react-icons/all";

const GroupIndexBanner = function ({currentPathName, groupName, groupId}) {
    return (
        <IndexBanner currentPathName={currentPathName}
                     path={{
                         head: "Group",
                         tail: groupName
                     }}
                     tabContents={[
                         {
                             to: '/groups/' + {groupId} + '/students',
                             name: 'Students',
                             icon: FaUserGraduate
                         },
                         {
                             to: '/groups/' + {groupId} + '/options',
                             name: 'Options',
                             icon: AiOutlineSetting
                         }
                     ]}
        />
    )
};

export {GroupIndexBanner};