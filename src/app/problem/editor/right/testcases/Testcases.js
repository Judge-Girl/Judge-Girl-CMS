import React, {useEffect} from "react";
import Block from "../Block";
import {useTestcaseEditList} from './usecase';
import {EditorButton} from "../../../commons/EditorButton";
import TestcaseEditor from "./TestcaseEditor";
import {problemService} from "../../../../../services/services";
import {useProblemEditorContext} from "../../context";


const Testcases = () => {
    const {problem} = useProblemEditorContext();
    const {setProblem, testcaseEdits, initializeTestcases, addNewTestcase, deleteTestcase} = useTestcaseEditList();

    useEffect(() => {
        if (problem) {
            setProblem(problem);
            if (!testcaseEdits) {
                initializeTestcases(problem.testcases);
            }
        }
    }, [problem, setProblem, testcaseEdits, initializeTestcases]);

    const onAddNewTestcaseButtonClick = () => {
        const newTestcaseEdit = addNewTestcase();
        // -- Scroll to the new testcase edit's element just created:
        // We use setTimeout here because React won't update the `testcaseEdits' state immediately,
        // so we predict that the 'testcaseEdits' will be updated after 150 ms.
        setTimeout(() => {
            const testcaseEditElement = document.getElementById(`testcase-${newTestcaseEdit.id}`);
            testcaseEditElement?.scrollIntoView({behavior: 'smooth', block: 'center'});
        }, 150)
    };

    if (!testcaseEdits) {
        return "";
    }
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
                                 onClick={onAddNewTestcaseButtonClick}/>
               }>
            <div className="testcases">

                {testcaseEdits.map((testcaseEdit) =>
                    <div id={`testcase-${testcaseEdit.id}`}>
                        <TestcaseEditor key={testcaseEdit.id}
                                        problemService={problemService}
                                        initialTestcaseEdit={testcaseEdit}
                                        onTestcaseDeleted={deleteTestcase}/>
                    </div>)
                }
            </div>
        </Block>
    </>;
};

export default Testcases;
