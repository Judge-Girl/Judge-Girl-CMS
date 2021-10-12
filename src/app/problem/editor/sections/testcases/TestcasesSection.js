import React, {useEffect} from 'react';
import './TestcasesSection.scss';
import EditorSection from '../commons/EditorSection';
import {useTestcaseEditList} from './usecase';
import TestcaseEditor from './TestcaseEditor';
import {problemService} from '../../../../../services/services';
import {useProblemEditorContext} from '../../context';


const TestcasesSection = () => {
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
    }, 150);
  };

  if (!testcaseEdits) {
    return '';
  }
  return <>
    <EditorSection
      title="Test Cases"
      id="problem-editor-testcases"
      // style={{marginBottom: '50px'}}
      titleButton={
        <button className="add-new-testcase-button button"
          onClick={onAddNewTestcaseButtonClick}>
					Add New Testcase
        </button>
      }>
      <div className="testcases">

        {testcaseEdits.map((testcaseEdit) =>
          <div key={`testcase-${testcaseEdit.id}`} id={`testcase-${testcaseEdit.id}`}>
            <TestcaseEditor key={testcaseEdit.id}
              problemService={problemService}
              initialTestcaseEdit={testcaseEdit}
              onTestcaseDeleted={deleteTestcase}/>
          </div>)
        }
      </div>
    </EditorSection>
  </>;
};

export default TestcasesSection;
