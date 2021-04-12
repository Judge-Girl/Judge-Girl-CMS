import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import {CreateGroupModal} from "./CreateGroupModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {Link} from "react-router-dom";

const useExamList = function () {
    const [groups, setGroups] = useState(undefined);
    const addGroup = (group) => groups.push(group);
    return {groups, addGroup, setGroups};
};

const GroupList = () => {
    const [showCreateGroupModal, setShowCreateGroupModal] = useState(false);
    const {groups, addGroup, setGroups} = useExamList();

    useEffect(() => {
        if (!groups) {
            studentService.getGroups()
                .then(groups => setGroups(groups));
        }
    });

    return (
        <div style={{padding: "40px 100px 20px 100px"}}>
            <ItemListPage title="Group List"
                          filterItems={["Filter", "Name"]}
                          Button={() => new CreateButton({
                              onCreateButtonClick: () => setShowCreateGroupModal(true)
                          })}
                          tableHeaders={["Group Name"]}
                          tableRowGenerator={{
                              list: groups,
                              key: (group) => group.name,
                              data: (group) => [
                                  <Link to={`/groups/${group.id}/students`}>{group.name}</Link>
                              ]
                          }}
                          tableDataStyle={{textAlign: "left"}}/>

            <CreateGroupModal show={showCreateGroupModal}
                              onClose={() => setShowCreateGroupModal(false)}
                              onGroupCreated={group => addGroup(group)}/>
        </div>
    )
};


export
{
    GroupList
};
