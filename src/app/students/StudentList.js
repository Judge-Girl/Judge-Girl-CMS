import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";

const StudentList = () => {
    const [students, setStudents] = useState();
    useEffect(() => {
        if (!students) {
            studentService.getStudents()
                .then(students => setStudents(students));
        }
    });
    return (
        <div style={{padding: "40px 100px 20px 100px"}}>
            <ItemListPage title="Student List"
                          filterItems={["Filter", "Name", "Email"]}
                          onCreateButtonClick={e => {
                          }}
                          tableHeaders={["Name", "Email", "Role", " "]}
                          tableRowGenerator={{
                              list: students,
                              data: (student) => [
                                  (<FakeLink content={student?.name}/>),
                                  student?.email,
                                  'Student',
                                  ""
                              ]
                          }}
                          tableDataStyle={{textAlign: "left"}}/>
        </div>
    )
};


export {StudentList};
