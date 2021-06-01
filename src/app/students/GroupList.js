import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import {CreateGroupModal} from "./CreateGroupModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {Link, Route, Switch} from "react-router-dom";
import {GroupMembers} from "./GroupMembers";

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
        <>
            <Route path="/groups" exact>
                <div style={{padding: "40px 100px 20px 100px"}}>
                    <ItemListPage title="Group List"
                                  filterItems={["Filter", "Name"]}
                                  Button={() => <CreateButton onClick={() => setShowCreateGroupModal(true)}/>}
                                  tableHeaders={["Group Name"]}
                                  tableRowGenerator={{
                                      list: groups,
                                      key: (group) => group.name,
                                      data: (group) => [
                                          <Link to={`/groups/${group.id}/members`}>{group.name}</Link>
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>

                    <CreateGroupModal show={showCreateGroupModal}
                                      onClose={() => setShowCreateGroupModal(false)}
                                      onGroupCreated={group => addGroup(group)}/>
                </div>
            </Route>

            <Switch>
                <Route path="/groups/:groupId/members">
                    <GroupMembers/>
                </Route>
                <Route path="/groups/:groupId/options">
                    <GroupMembers/>
                </Route>
            </Switch>
        </>
    )
};

export {GroupList};
