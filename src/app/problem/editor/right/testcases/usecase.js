import {useState} from "react";

const useTestcaseList = (problem) => {
    const [testcases, setTestcases] = useState([]);

    const addNewTestcase = () => {
        const nextId = testcases ? Math.max(...testcases.map(t => t.id)) + 1 : 0;
        setTestcases([...testcases,
            {
                id: nextId,
                name: nextId,
                timeLimit: 0,
                memoryLimit: 0,
                outputLimit: 0,
                threadNumberLimit: -1,
                grade: 0,
                problemId: problem.id,

                // the manipulation state of a testcase
                saved: false, // new testcase --> not saved yet
                editing: true // new testcase --> is under editing
            }]);
    };

    const deleteTestcase = testcase => {
        setTestcases(testcasesList => testcasesList.filter(tc => tc.id !== testcase.id));
    };

    const initializeTestcases = testcases => {
        for (const testcase of testcases) {
            testcase.saved = true; // old testcases --> should have been saved
        }
        setTestcases(testcases);
    };

    return {testcases, initializeTestcases, addNewTestcase, deleteTestcase};
};

export default useTestcaseList;
