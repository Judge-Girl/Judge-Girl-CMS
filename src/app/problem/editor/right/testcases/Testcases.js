import React, {useEffect, useState} from "react";
import Block from "../Block";
import useTestcaseList from './usecase';
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {problemService} from "../../../../../services/services";
import {useParams} from "react-router-dom";


const Testcases = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {testcases, setTestcases, addNewTestcase, deleteTestcase} = useTestcaseList();

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(problem => {
                    setProblem(problem);
                    setTestcases(problem.testcases)
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
                {testcases.map((testcase) =>
                    <TestcaseEditor key={testcase.id} testcase={testcase} deleteTestcase={deleteTestcase}/>)
                }
            </div>
        </Block>
    </>;
};

export default Testcases;
