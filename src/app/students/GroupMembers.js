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
            .then(errorList => console.log(errorList))
        setMembers(undefined)
    }

    const deleteMembersFormGroup = (selectedMember) => {
        console.log(`groupId=${groupId}, studentId=${selectedMember.id}`);
        studentService.deleteMembersFromGroup(groupId, selectedMember.id)
            .then(res => {
                const removed = members.filter(member => member.id === selectedMember.id)
                const index = members.indexOf(removed)
                if (index > -1) {
                    members.splice(index, 1)
                }
                setMembers([])
                setMembers(members)
            });

    }

    useEffect(() => {
        if (!group) {
            studentService.getGroupById(groupId)
                .then(group => setGroup(group));
        }

        if (!members && group) {
            studentService.getMembersInGroup(groupId)
                .then(members => setMembers(members));
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