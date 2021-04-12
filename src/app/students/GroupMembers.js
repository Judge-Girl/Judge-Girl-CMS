import {withRouter} from "react-router";
import {GroupIndexBanner} from "./GroupIndexBanner";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import FakeLink from "../commons/FakeLink";
import React, {useEffect, useState} from "react";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {studentService} from "../../services/services";
import {Spinner} from "../commons/Spinner";


const GroupMembers = withRouter(({history, match}) => {
    const currentPathName = history.location.pathname;
    const [group, setGroup] = useState(undefined);
    const [students, setStudents] = useState(undefined);

    const actionItemsButton = () => new ThreeDotsButton({
        dropDownItems: [
            {
                name: "Remove",
                dangerous: true,
                onClick: () => console.log("onClick")
            }
        ]
    })

    useEffect(() => {
        if (!group) {
            studentService.getGroupById(match.params.groupId)
                .then(group => setGroup(group));
        }

        if (!students && group) {
            studentService.getStudentsByGroupId(group.id)
                .then(students => setStudents(students));
        }
    });

    return (
        <div>
            {group === undefined ? <Spinner/> : <GroupIndexBanner currentPathName={currentPathName}
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
                                      actionItemsButton()
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>
            </div>
        </div>
    )
});

export {GroupMembers};