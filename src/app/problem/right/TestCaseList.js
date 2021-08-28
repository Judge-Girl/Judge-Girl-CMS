import {useState} from "react";
import TestCases from "../../problem-old/edit/testCase/TestCases";
import {EditorButton} from "../../problem-old/edit/EditorButton";


const TestCaseList = () => {
    const [testCasesId, setTestCasesId] = useState(0);
    const [testCasesList, setTestCasesList] = useState([]);

    const addNewTestCase = () => {
        setTestCasesList([...testCasesList, testCasesId]);
        setTestCasesId(testCasesId => testCasesId + 1);
    };

    const deleteTestCase = deleteId => {
        setTestCasesList(testCasesList => testCasesList.filter(testCaseId => testCaseId !== deleteId));
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