import React, {useState} from "react";
import {Redirect} from "react-router-dom";
import {withRouter} from "react-router";
import {Spinner} from "../commons/Spinner";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {DangerZone} from "../commons/dangerZone/DangerZone";
import {useGroupContext} from "./GroupContext";
import {GroupInPageNavigationBar} from "./GroupInPageNavigationBar";
import {studentService} from "../../services/services";

const GroupOptions = withRouter(({history}) => {
    const currentURL = history.location.pathname;
    const {currentGroup, groups, setGroups} = useGroupContext()
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [showDeleteGroupModal, setShowDeleteGroupModal] = useState(false);

    const deleteGroup = () => {
        studentService.deleteGroupById(currentGroup.id)
            .then(() => {
                setShouldRedirect(true);
                setGroups(groups.filter(g => g !== currentGroup));
            });
    };

    if (shouldRedirect) {
        return (<Redirect to={`/groups`}/>)
    }

    if (!currentGroup) {
        return (<Spinner/>)
    }

    return (
        <div>
            <GroupInPageNavigationBar currentURL={currentURL}
                                      groupName={currentGroup.name}
                                      groupId={currentGroup.id}/>

            <div style={{width: "80%", alignItems: "center", margin: "auto"}}>
                <DangerZone onDangerButtonClicked={() => setShowDeleteGroupModal(true)}
                            title={'Delete this group'}
                            description={'Once you delete a group, there is no going back. Please be certain.'}
                            buttonName={'Delete Group'}
                />
            </div>

            <RemoveConfirmationModal title={"Delete the Group"}
                                     data={[{
                                         title: "Group Name",
                                         value: currentGroup.name
                                     }]}
                                     show={showDeleteGroupModal}
                                     onClose={() => setShowDeleteGroupModal(false)}
                                     onSubmit={() => deleteGroup()}/>
        </div>
    )
});

export {GroupOptions};
