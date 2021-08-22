import TestCases from "../../problem/edit/testCase/TestCases";
import {EditorButton} from "../../problem/edit/EditorButton";
import React, {useState} from "react";


const TestCaseList = () => {
    const [testCasesId, setTestCasesId] = useState(0);
    const [testCasesList, setTestCasesList] = useState([]);

    const addNewTestCase = () => {
        const newId = testCasesId;
        setTestCasesList([...testCasesList, newId]);
        setTestCasesId(newId + 1);
    };

    const deleteTestCase = deleteId => {
        const removeAttr = [...testCasesList].filter(testCaseId => testCaseId !== deleteId);
        setTestCasesList(removeAttr);
    };

    return <>
        <TestCases testCasesItems={testCasesList} removeTestCase={deleteTestCase}/>
        <div style={{margin: "2% 3%"}}>
            <EditorButton
                text={"Add New Test Case"}
                buttonColor={"#1273BA"}
                fontColor={"#FFFFFF"}
                width={"100%"}
                height={46}
                onClick={addNewTestCase}
            />
        </div>
    </>
};




export default TestCaseList;