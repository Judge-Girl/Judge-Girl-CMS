import {useState} from "react";
import Testcase from "../../../../../models/Testcase";


const useTestcaseList = () => {
    const [testcases, setTestcases] = useState([]);

    const addNewTestcase = () => {
        const nextId = testcases ? Math.max(...testcases.map(t => t.id)) + 1 : 0;
        console.log(`Next testcase's id: ${nextId}`);
        setTestcases([...testcases, new Testcase({id: nextId})]);
    };

    const deleteTestcase = deletedId => {
        setTestcases(testcasesList => testcasesList.filter(testcase => testcase.id !== deletedId));
    };

    return {testcases, setTestcases, addNewTestcase, deleteTestcase}
};

export default useTestcaseList;
