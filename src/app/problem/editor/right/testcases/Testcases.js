import React, {useEffect, useState} from "react";
import Block from "../Block";
import useTestcaseList from './usecase';
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {problemService} from "../../../../../services/services";
import {useParams} from "react-router-dom";
import Testcase from "../../../../../models/Testcase";


const Testcases = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {testcases, initializeTestcases, addNewTestcase, deleteTestcase} = useTestcaseList(problem);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(problem => {
                    setProblem(problem);
                    initializeTestcases(problem.testcases);
                });
        }
    });

    const saveTestcase = testcase => {
        problemService.upsertTestcase(new Testcase(testcase))
            .then(() => {
                console.log("Testcase upserted.");
            });
    };

    return <>
        <Block title="Test Cases"
               id="problem-editor-testcases"
               style={{marginBottom: "50px"}}
               titleButton={
                   <EditorButton text="Add New Testcase"
                                 width="180px"
                                 height="36px"
                                 borderRadius="50px"
                                 fontColor="rgba(124,124,124,1)"
                                 borderColor="#D2D2D2"
                                 onClick={addNewTestcase}/>
               }>
            <div className="testcases">
                {testcases.map((testcase) =>
                    <TestcaseEditor key={testcase.id}
                                    editing={testcase.editing}
                                    initialTestcase={testcase}
                                    onTestcaseSaved={saveTestcase}
                                    onTestcaseDeleted={deleteTestcase}/>)
                }
            </div>
        </Block>
    </>;
};

export default Testcases;
