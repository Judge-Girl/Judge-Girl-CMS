import {withRouter} from "react-router";
import {GroupHome} from "./GroupHome";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import FakeLink from "../commons/FakeLink";
import React, {useEffect, useState} from "react";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {studentService} from "../../services/services";
import {Spinner} from "../commons/Spinner";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";


const GroupMembers = withRouter(({history, match}) => {
    const currentPathName = history.location.pathname;
    const [group, setGroup] = useState(undefined);
    const [students, setStudents] = useState(undefined);
    const [member, setMember] = useState(undefined);
    const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(undefined);

    const actionItemsButton = (member) => new ThreeDotsButton({
        dropDownItems: [{
            name: "Remove",
            dangerous: true,
            onClick: () => {
                setMember(member.student);
                setShowRemoveMemberModal(true);
            }
        }]
    })

    useEffect(() => {
        if (!group) {
            studentService.getGroupById(match.params.groupId)
                .then(group => setGroup(group));
        }

        if (!students && group) {
            studentService.getMembersInGroup(group.id)
                .then(students => setStudents(students));
        }
    });

    return (
        <div>
            {group === undefined ? <Spinner/> : <GroupHome currentPathName={currentPathName}
                                                           groupName={group.name}
                                                           groupId={group.id}/>}

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ItemListPage title="Group Members"
                              filterItems={["Filter", "Name", "Email"]}
                              Button={() => new CreateButton({
                                  onCreateButtonClick: () => console.log("onClick")
                              })}
                              tableHeaders={["Name", "Email", " "]}
                              tableRowGenerator={{
                                  list: students,
                                  key: (student) => student.id,
                                  data: (student) => [
                                      (<FakeLink content={student.name}/>),
                                      student.email,
                                      actionItemsButton({student})
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>
            </div>


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
                                     show={showRemoveMemberModal}
                                     onClose={() => setShowRemoveMemberModal(false)}/>

        </div>
    )
});

export {GroupMembers};