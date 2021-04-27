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
    const [student, setStudent] = useState(undefined);
    const [member, setMember] = useState(undefined);
    const [showRemoveStudentModal, setShowRemoveStudentModal] = useState(undefined);
    const [showAddStudentModal, setShowAddStudentModal] = useState(undefined);

    var groupId = match.params.groupId;

    const actionItemsButton = (member) => new ThreeDotsButton({
        dropDownItems: [{
            name: "Remove",
            dangerous: true,
            onClick: () => {
                setMember(member.student);
                setShowRemoveStudentModal(true);
            }
        }]
    })

    const addStudentsByEmails = (emails) => {
        console.log(emails)
        studentService.addMembersInToGroupByEmails(groupId, emails)
            .then(errorList => console.log(`errorList:${errorList}`))
    }

    const deleteMembersFormGroup = (student) => {
        console.log(`groupId=${groupId}, studentId=${student.id}`);
        studentService.deleteMembersFromGroup(groupId, student.id)
            .then(res => console.log(res));
    }

    useEffect(() => {
        if (!group) {
            studentService.getGroupById(groupId)
                .then(group => setGroup(group));
        }

        if (!student && group) {
            studentService.getMembersInGroup(groupId)
                .then(students => setStudent(students));
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
                                  onCreateButtonClick: () => setShowAddStudentModal(true)
                              })}
                              tableHeaders={["Name", "Email", " "]}
                              tableRowGenerator={{
                                  list: student,
                                  key: (student) => student.id,
                                  data: (student) => [
                                      (<FakeLink content={student.name}/>),
                                      student.email,
                                      actionItemsButton({student})
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
                                    show={showAddStudentModal}
                                    onClose={() => setShowAddStudentModal(false)}
                                    onSubmit={(emails) => addStudentsByEmails(emails)}/>

            <RemoveConfirmationModal title={"Remove the Student"}
                                     data={[
                                         {
                                             title: "Name",
                                             value: member?.name
                                         },
                                         {
                                             title: "Email",
                                             value: member?.email
                                         }]}
                                     show={showRemoveStudentModal}
                                     onClose={() => setShowRemoveStudentModal(false)}
                                     onSubmit={() => deleteMembersFormGroup(member)}/>
        </div>
    )
});

export {GroupMembers};