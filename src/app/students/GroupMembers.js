import {withRouter} from "react-router";
import {GroupIndexBanner} from "./GroupIndexBanner";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import FakeLink from "../commons/FakeLink";
import React, {useEffect, useState} from "react";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {studentService} from "../../services/services";

const GroupMembers = withRouter( ({history, location}) => {
    const currentPathName = history.location.pathname;
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
        if (!students) {
            studentService.getStudentsByGroupId(location.state.id)
                .then(students => setStudents(students));
        }
    });

    return (
        <div>
            <p>{console.log(location)}</p>
            <GroupIndexBanner currentPathName={currentPathName}
                              groupName={location.state.name}
                              groupId={location.state.id}
            />

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