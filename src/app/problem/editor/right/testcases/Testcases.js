import React, {useEffect, useState} from "react";
import Block from "../Block";
import {useTestcaseEditList} from './usecase';
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {useParams} from "react-router-dom";
import {problemService} from "../../../../../services/services";


const Testcases = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {testcaseEdits, initializeTestcases, addNewTestcase, deleteTestcase} = useTestcaseEditList(problem);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(problem => {
                    setProblem(problem);
                    initializeTestcases(problem.testcases);
                });
        }
    });

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
                {testcaseEdits.map((testcaseEdit) =>
                    <TestcaseEditor key={testcaseEdit.id}
                                    problemService={problemService}
                                    initialTestcaseEdit={testcaseEdit}
                                    onTestcaseDeleted={deleteTestcase}/>)
                }
            </div>
        </Block>
    </>;
};

export default Testcases;
