import {withRouter} from "react-router";
import {GroupInPageNavigationBar} from "./GroupInPageNavigationBar";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import FakeLink from "../commons/FakeLink";
import React, {useEffect, useState} from "react";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {studentService} from "../../services/services";
import {Spinner} from "../commons/Spinner";
import {AiOutlineMail} from "react-icons/ai";
import {AddStudentToGroupModal} from "./AddStudentToGroupModal";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {removeIf} from "../../utils/array";

const GroupMembers = withRouter(({history, match}) => {
    const currentPathName = history.location.pathname;
    const [group, setGroup] = useState(undefined);
    const [members, setMembers] = useState(undefined);
    const [selectedMember, setSelectedMember] = useState(undefined);
    const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(undefined);
    const [showAddMemberModal, setShowAddMemberModal] = useState(undefined);

    const groupId = match.params.groupId;

    const actionItemsButton = (selectedMember) => new ThreeDotsButton({
        dropDownItems: [{
            name: "Remove",
            dangerous: true,
            onClick: () => {
                setSelectedMember(selectedMember.member);
                setShowRemoveMemberModal(true);
            }
        }]
    })

    const addStudentsByEmails = (emails) => {
        studentService.addMembersInToGroupByEmails(groupId, emails)
            // TODO: the error should be handled in the future
            .then(errorList => {
                console.log(errorList)
                // TODO: TODO: currently, to avoid "render more hooks than expected" error thrown from React,
                //  setting an empty array is a effective trick, but we need to know the root cause
                //  and use the more proper way instead.
                setMembers([])
                fetchMembers();
            })
    }

    const deleteMembersFormGroup = (selectedMember) => {
        studentService.deleteMembersFromGroup(groupId, selectedMember.id)
            .then(() => {
                removeIf(members, member => member.id === selectedMember.id)
                // TODO: TODO: currently, to avoid "render fewer hooks than expected" error thrown from React,
                //  setting an empty array is a effective trick, but we need to know the root cause
                //  and use the more proper way instead.
                setMembers([])
                setMembers(members)
            });
    }

    const fetchMembers = () => {
        studentService.getMembersInGroup(groupId)
            .then(members => setMembers(members));
    }

    useEffect(() => {
        if (!group) {
            studentService.getGroupById(groupId)
                .then(group => setGroup(group));
        }
        if (!members && group) {
            fetchMembers();
        }
    });

    return (
        <div>
            {group ? <GroupInPageNavigationBar currentPathName={currentPathName}
                                               groupName={group.name}
                                               groupId={group.id}/> : <Spinner/>}

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ItemListPage title="Group Members"
                              filterItems={["Filter", "Name", "Email"]}
                              Button={() => new CreateButton({
                                  onCreateButtonClick: () => setShowAddMemberModal(true)
                              })}
                              tableHeaders={["Name", "Email", " "]}
                              members = {members}
                              tableRowGenerator={{
                                  list: members,
                                  key: (member) => member.id,
                                  data: (member) => [
                                      (<FakeLink content={member.name}/>),
                                      member.email,
                                      actionItemsButton({member})
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>
            </div>

            <AddStudentToGroupModal title={"Add Students"}
                                    content={{
                                        description: "Add students to the group by students' email.",
                                        Icon: AiOutlineMail,
                                        placeholder: "studentA@example.com\nstudentB@example.com",
                                        remark: "＊One email per line.",
                                        buttonName: "Add"
                                    }}
                                    show={showAddMemberModal}
                                    onClose={() => setShowAddMemberModal(false)}
                                    onSubmit={(emails) => addStudentsByEmails(emails)}/>

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
});

export {GroupMembers};