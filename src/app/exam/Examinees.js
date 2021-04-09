import React, {useEffect, useState} from "react";
import {withRouter} from "react-router";
import {ExamHome} from "./ExamHome"
import FakeLink from "../commons/FakeLink";
import {studentService} from "../../services/services";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {DropDownBtn} from "../commons/buttons/DropDownButton";

const Examinees = withRouter(({history}) => {
    const currentPathName = history.location.pathname;
    const [students, setStudents] = useState(undefined);

    useEffect(() => {
        if (!students) {
            studentService.getStudents({skip: 0, size: 100})
                .then(students => setStudents(students));
        }
    });

    return (
        <div>
            <ExamHome currentPathName={currentPathName} examName={"2021 Sample-Exam"}/>

            <div style={{padding: "40px 15rem 20px 15rem"}}>
                <ItemListPage title="Participants"
                              filterItems={["Filter", "Name", "Email"]}
                    // TODO: connect to AddStudentModal / AddGroupModal
                              Button={() => new DropDownBtn({
                                  buttonName: '+ People',
                                  subButtons: [
                                      {
                                          name: "Student",
                                          onClick: () => console.log('add student')
                                      },
                                      {
                                          name: "Group",
                                          onClick: () => console.log('add group')
                                      }
                                  ]
                              })}
                              tableHeaders={["Name", "Email", " "]}
                              tableRowGenerator={{
                                  list: students,
                                  key: (student) => student.id,
                                  data: (student) => [
                                      (<FakeLink content={student.name}/>),
                                      student.email,
                                      ""
                                  ]
                              }}
                              tableDataStyle={{textAlign: "left"}}/>
            </div>
        </div>
    );
});

export {Examinees};