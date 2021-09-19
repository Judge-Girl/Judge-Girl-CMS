import React, {useEffect, useState} from "react";
import Block from "../Block";
import useTestcaseList from './usecase';
import {EditSaveCancelButton} from "../../../commons/EditSaveCancelButton";
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {problemService} from "../../../../../services/services";
import {useParams} from "react-router-dom";

const TestCaseList = () => {
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
        <div className="testcases">
            {testcases.map((testcase) =>
                <TestcaseEditor testcase={testcase} deleteTestcase={deleteTestcase}/>)
            }
        </div>
        <div>
            <EditorButton
                text={"Add New Test Case"}
                buttonColor={"#1273BA"}
                fontColor={"#FFFFFF"}
                width={"100%"}
                height={46}
                onClick={addNewTestcase}
            />
        </div>
    </>;
};

const Testcases = () => {
    const [isEditing, setIsEditing] = useState(false);

    const onClickEdit = () => {
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setIsEditing(false);
    };

    return <>
        <Block title="Test Cases"
               id="problem-editor-testcases"
               style={{marginBottom: "50px"}}
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {isEditing?
                <TestCaseList/>
                : <>{/* TODO: Will be announced in the Github Issue. */}</>

            }
        </Block>
    </>;
};

export default Testcases;
