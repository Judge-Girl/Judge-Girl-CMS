import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";

const GroupList = () => {
    const [groups, setGroups] = useState();
    useEffect(() => {
        if (!groups) {
            studentService.getGroups()
                .then(groups => setGroups(groups));
        }
    });
    return (
        <div style={{padding: "40px 100px 20px 100px"}}>
            <ItemListPage title="Group List"
                          filterItems={["Filter", "Name"]}
                          onCreateButtonClick={e => {
                          }}
                          tableHeaders={["Group Name"]}
                          tableRowGenerator={{
                              list: groups,
                              data: (group) => [
                                  (<FakeLink content={group.name}/>)
                              ]
                          }}
                          tableDataStyle={{textAlign: "left"}}/>
        </div>
    )
};


export {GroupList};
