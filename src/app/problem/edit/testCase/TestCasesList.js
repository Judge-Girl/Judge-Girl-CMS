import {SubtitleLine} from "../../../commons/titles/TitleLine";
import React, {useState} from "react";
import {EditorButton} from "../EditorButton";
import TestCases from "./TestCases";

function TestCasesList() {
    const [testCasesId, setTestCasesId] = useState(0);
    const [testCasesList, setTestCasesList] = useState([]);

    const addNewTestCase = () => {
        const newId = testCasesId;
        setTestCasesList([...testCasesList, newId]);
        setTestCasesId(newId + 1);
    };

    const deleteTestCase = deleteId => {
        const removeAttr = [...testCasesList].filter(testCaseId => testCaseId !== deleteId)
        setTestCasesList(removeAttr);
    }

    return (
        <div>
            <SubtitleLine title="Test Cases"/>
            <TestCases testCasesItems={testCasesList} removeTestCase={deleteTestCase}/>
            <EditorButton
                text={"Add New Test Case"}
                buttonColor={"#1273BA"}
                fontColor={"#FFFFFF"}
                width={702}
                height={46}
                onClickFunc={addNewTestCase}
            />
        </div>
    );
}

export default TestCasesList;