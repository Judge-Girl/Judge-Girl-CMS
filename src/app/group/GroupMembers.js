import React, {useEffect, useState} from "react";
import {useParams, useRouteMatch} from "react-router-dom";
import {AiOutlineMail} from "react-icons/ai";
import {studentService} from "../../services/services";
import {GroupInPageNavigationBar} from "./GroupInPageNavigationBar";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import FakeLink from "../commons/FakeLink";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {Spinner} from "../commons/Spinner";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {TextareaModal} from "../commons/modals/TextareaModal";
import {useGroupContext} from "./GroupContext";
import GroupNotFound from "./GroupNotFound";

const GroupMembers = () => {
    const {url: currentURL} = useRouteMatch()
    const {groupId} = useParams();
    const {currentGroup, setCurrentGroup} = useGroupContext()
    const [members, setMembers] = useState(undefined);
    const [selectedMember, setSelectedMember] = useState(undefined);
    const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(undefined);
    const [showAddMemberModal, setShowAddMemberModal] = useState(undefined);
    const [groupIdNotFound, setGroupIdNotFound] = useState(false);

    const actionItemsButton = (selectedMember) =>
        <ThreeDotsButton dropDownItems={[{
            name: "Remove",
            dangerous: true,
            onClick: () => {
                setSelectedMember(selectedMember.member);
                setShowRemoveMemberModal(true);
            }
        }]}/>;

    const addMembersByEmails = (emails) => {
        studentService.addMembersInToGroupByEmails(groupId, emails)
            // TODO: the error should be handled in the future
            .then(errorList => {
                console.log(errorList);
                fetchMembers();
            })
    };

    const deleteMembersFormGroup = (selectedMember) => {
        studentService.deleteMembersFromGroup(groupId, selectedMember.id)
            .then(() => {
                setMembers(members.filter(member => member.id !== selectedMember.id))
            });
    };

    const fetchMembers = () => {
        studentService.getMembersInGroup(groupId)
            .then(members => setMembers(members));
    };


    useEffect(() => {
        if (!currentGroup) {
            studentService.getGroupById(groupId)
                .then(group => setCurrentGroup(group))
                .catch(reason => setGroupIdNotFound(true));
        }
        if (!members && currentGroup) {
            fetchMembers();
        }
    });

    if (groupIdNotFound) {
        return <GroupNotFound/>
    } else if (!currentGroup) {
        return <Spinner/>
    }

    return (
        <div>
            <GroupInPageNavigationBar currentURL={currentURL}
                                      groupName={currentGroup.name}
                                      groupId={currentGroup.id}/>

            <div style={{paddingTop: "20px", width:"70%", marginLeft:"auto", marginRight:"auto"}}>
                <ItemListPage title="Group Members"
                              filterItems={["Filter", "Name", "Email"]}
                              Button={() => <CreateButton onClick={() => setShowAddMemberModal(true)}/>}
                              tableHeaders={["Name", "Email", " "]}
                              members={members}
                              tableRowGenerator={{
                                  list: members,
                                  key: (member) => member.id,
                                  data: (member) => [
                                      <FakeLink>{member.name}</FakeLink>,
                                      member.email,
                                      actionItemsButton({member})
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>
            </div>

            <TextareaModal title={"Add Students"}
                           body={{
                               description: "Add students to the group by students' email.",
                               Icon: AiOutlineMail,
                               placeholder: "studentA@example.com\nstudentB@example.com",
                               remark: "＊One email per line.",
                               buttonName: "Add"
                           }}
                           show={showAddMemberModal}
                           onClose={() => setShowAddMemberModal(false)}
                           onSubmit={(emails) => addMembersByEmails(emails)}/>

            <RemoveConfirmationModal title={"Remove the Student"}
                                     data={[
                                         {
                                             title: "Name",
                                             value: selectedMember?.name
                                         },
                                         {
                                             title: "Email",
                                             value: selectedMember?.email
                                         }]}
                                     show={showRemoveMemberModal}
                                     onClose={() => setShowRemoveMemberModal(false)}
                                     onSubmit={() => deleteMembersFormGroup(selectedMember)}/>
        </div>
    )
}

export {GroupMembers};
