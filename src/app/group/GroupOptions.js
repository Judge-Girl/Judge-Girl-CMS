import React, {useEffect, useState} from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom";
import {Spinner} from "../commons/Spinner";
import {DeleteConfirmationModal} from "../commons/modals/DeleteConfirmationModal";
import {DangerZone} from "../commons/dangerZone/DangerZone";
import {useGroupContext} from "./GroupContext";
import {GroupInPageNavigationBar} from "./GroupInPageNavigationBar";
import {studentService} from "../../services/services";
import {TitleLine} from "../commons/titles/TitleLine";
import GroupNotFound from "./GroupNotFound";

const GroupOptions =() => {
    const {url: currentURL} = useRouteMatch()
    const {groupId} = useParams();
    const {currentGroup, setCurrentGroup, groups, setGroups} = useGroupContext()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);
    const [groupIdNotFound, setGroupIdNotFound] = useState(false);

    const deleteGroup = () => {
        studentService.deleteGroupById(currentGroup.id)
            .then(() => {
                setShouldRedirect(true);
                setGroups(groups.filter(g => g !== currentGroup));
            });
    };

    useEffect(() => {
        if (!currentGroup) {
            studentService.getGroupById(groupId)
                .then(group => setCurrentGroup(group))
                .catch(reason => setGroupIdNotFound(true));
        }
    })

    if (groupIdNotFound) {
        return <GroupNotFound/>
    } else if (!currentGroup) {
        return <Spinner/>
    }

    return (
        <div>
            {shouldRedirect ? <Redirect to={`/groups`}/> : ""}
            <GroupInPageNavigationBar currentURL={currentURL}
                                      groupName={currentGroup.name}
                                      groupId={currentGroup.id}/>

            <div style={{width: "80%", alignItems: "center", margin: "auto", marginTop: "40px"}}>
                <TitleLine title={"Danger Zone"}/>
                <DangerZone onDangerButtonClick={() => setShowDeleteGroupModal(true)}
                            header={'Delete this group'}
                            description={'Once you delete a group, there is no going back. Please be certain.'}
                            buttonName={'Delete Group'}
                />
            </div>

            <DeleteConfirmationModal title={"Delete the Group"}
                                     data={[{
                                         title: "Group Name",
                                         value: currentGroup.name
                                     }]}
                                     show={showDeleteGroupModal}
                                     onClose={() => setShowDeleteGroupModal(false)}
                                     onSubmit={deleteGroup}/>
        </div>
    )
}

export {GroupOptions};
