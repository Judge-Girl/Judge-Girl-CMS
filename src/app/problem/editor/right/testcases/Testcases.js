import React, {useEffect, useState} from "react";
import Block from "../Block";
import {useTestcaseList} from './usecase';
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {problemService} from "../../../../../services/services";
import {useParams} from "react-router-dom";
import Testcase from "../../../../../models/Testcase";

const Testcases = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {testcases, initializeTestcases, addNewTestcase, deleteTestcase, updateTestcase} = useTestcaseList(problem);

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

    const patchTestcaseIOs = testcaseIOsPatch => {
        problemService.patchTestcaseIOs(testcaseIOsPatch)
            .then((patchedTestcase) => {
                updateTestcase(testcaseIOsPatch.testcaseId, () => patchedTestcase);
                console.log("Testcase IOs patched");
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
                    // The key of TestcaseEditor must be 'testcase.id + testcase.ioFileId'
                    // because whenever the testcase is patched, its ioFileId will be changed,
                    // then React will re-initialize the TestcaseEditor with the patched testcase's content
                    <TestcaseEditor key={testcase.id + testcase.ioFileId}
                                    editing={testcase.editing}
                                    initialTestcase={testcase}
                                    onTestcaseSaved={saveTestcase}
                                    onTestcaseIOsPatched={patchTestcaseIOs}
                                    onTestcaseDeleted={deleteTestcase}/>)
                }
            </div>
        </Block>
    </>;
};

export default Testcases;
