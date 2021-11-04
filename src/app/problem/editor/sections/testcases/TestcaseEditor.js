import './TestcaseEditor.scss';
import React, {useState} from 'react';
import FixedUploadFileItems from '../commons/FixedUploadFileItems';
import UploadFileButton from '../../../commons/UploadFileButton';
import IconTextItems from '../../../../commons/TextInputForm/IconTextItems';
import Testcase from '../../../../../models/Testcase';
import DotLoader from 'react-spinners/DotLoader';
import {FaCircle, VscFileCode} from 'react-icons/all';
import {EditSaveCancelButton} from '../../../commons/EditSaveCancelButton';
import {useTestcaseIosPatch} from './usecase';
import {ConfirmationModal, DeleteConfirmationModal} from '../../../../commons/modals/ConfirmationModal';


const TestCaseName = ({name, isEditing, onChange}) => {
  return (
    <div className="testcase-name">
            Testcase Name
      {isEditing ?
        <input type="text" className="testcase-name-input"
          value={name} onChange={e => onChange(e.target.value)}/>
        :
        <span>{name}</span>
      }
    </div>
  );
};

const TestCaseSubtitle = ({title}) => {
  return <>
    <div className="testcase-subtitle">{title}</div>
    <hr/>
  </>;
};

const BulletText = ({title, value, onChange, isEditing, type = 'text'}) => {
  return (
    isEditing ?
      <div className="bullet-text">
        <FaCircle size={6}/>
        <span>{title}</span>
        <input type={type} value={value} onChange={e => {
          const value = type === 'number' ? parseInt(e.target.value) : e.target.value;
          onChange(value);
        }}
        placeholder={0}/>
      </div>
      :
      <div className="bullet-text">
        <FaCircle size={6}/>
        <span>{title}: {value}</span>
      </div>
  );
};

const UploadFileItems = ({buttonName, buttonColor, files, onFilesUploaded, removeFile, isEditing, multipleFiles, fileRemovable = true}) => {
  return (
    isEditing ?
      <>
        <FixedUploadFileItems items={files.map(f => {
          return {key: f.name, text: f.name};
        })} fileRemovable={fileRemovable} removeItem={item => removeFile(item.text)}
        style={{marginBottom: '5px'}}/>
        <UploadFileButton buttonName={buttonName}
          buttonColor={buttonColor}
          onFilesUploaded={onFilesUploaded}
          multipleFiles={multipleFiles}
          fontSize='13px'
          buttonHeight='28px'/>
      </>
      :
      <IconTextItems icon={<VscFileCode size={18}/>}
        items={files.map(file => file.name)}/>
  );
};

function TestcaseEditor({
  problemService, initialTestcaseEdit,
  onTestcaseDeleted
}) {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [testcaseEdit, setTestcaseEdit] = useState(initialTestcaseEdit);
  const [showConfirmCancelModal, setShowConfirmCancelModal] = useState(false);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);

  const {
    createTestcaseIOsPatch, inputFiles, addInputFiles, removeInputFile,
    outputFiles, addOutputFiles, removeOutputFile,
    stdIns, setStandardInFile, stdOuts, setStandardOutFile,
    reset: resetTestcaseIOsPatching, commit: commitTestcaseIOsPatching
  } = useTestcaseIosPatch(initialTestcaseEdit);

  const onClickEdit = () => {
    setTestcaseEdit(testcaseEdit.startEditing());
  };

  const onClickSave = () => {
    const testcaseIOsPatch = createTestcaseIOsPatch();

    // save the testcase or its IOs only if it is actually edited
    const shouldSave = testcaseEdit.edited || !testcaseIOsPatch.isEmpty()
            // for the new testcaseEdit, must save it on the first edition
            || !testcaseEdit.saved;

    async function createTestcaseWithIo() {
        await saveTestcase(new Testcase(testcaseEdit));
        patchTestcaseIOs(testcaseIOsPatch);
    }

    if (shouldSave) {
      setSaving(true);
      if (!testcaseEdit.saved && !testcaseIOsPatch.isEmpty()) {
          createTestcaseWithIo();
      } else {
          if (testcaseEdit.edited || !testcaseEdit.saved) {
              saveTestcase(new Testcase(testcaseEdit));
          }
          if (!testcaseIOsPatch.isEmpty()) {
              patchTestcaseIOs(testcaseIOsPatch);
          }
      }
    } else {
      setTestcaseEdit(testcaseEdit.cancelEditing());
    }
  };

  const onClickCancel = () => {
    resetTestcaseIOsPatching();
    if (testcaseEdit.saved) {
      setTestcaseEdit(testcaseEdit.cancelEditing());
    } else {
      // ask the user to confirm the cancel action
      //  --> this will delete this testcase since it's not saved
      setShowConfirmCancelModal(true);
    }
  };

  const onTestcaseEdit = (edition) => {
    setTestcaseEdit(testcaseEdit.edit(edition));
  };

  const saveTestcase = (testcase) => {
    problemService.saveTestcase(testcase)
      .then(() => {
        setTestcaseEdit(testcaseEdit.save());
      })
      .catch(error => {
        alert(error.message);
        setTestcaseEdit(testcaseEdit.error(error.message));
      }).finally(() => setSaving(false));
  };

  const patchTestcaseIOs = (testcaseIOsPatch) => {
    problemService.patchTestcaseIOs(testcaseIOsPatch)
      .then((patchedTestcase) => {
        Object.assign(testcaseEdit, patchedTestcase);
        setTestcaseEdit(testcaseEdit.save());
        commitTestcaseIOsPatching();
      })
      .catch(error => {
        alert(error.message);
        setTestcaseEdit(testcaseEdit.error(error.message));
      }).finally(() => setSaving(false));
  };

  const deleteTestcaseEdit = (testcaseEdit) => {
    setDeleting(true);
    problemService.deleteTestcase(testcaseEdit.problemId, testcaseEdit.id)
      .then(() => {
        onTestcaseDeleted(testcaseEdit);
        testcaseEdit.delete();
      })
      .catch(error => {
        alert(error.message);
      })
      .finally(() => setDeleting(false));
  };

  return (
    <div key={testcaseEdit.id} className={`testcase-editor 
        ${testcaseEdit.hasError() ? 'cannot-save' :
      testcaseEdit.editing ? 'can-save' : 'testcase-view'}`}>
      <div className="testcase-name-row">
        <TestCaseName name={testcaseEdit.name} isEditing={testcaseEdit.editing}
          onChange={(name) => onTestcaseEdit({name})}/>
        <div style={{justifyContent: 'flex-end', display: 'flex'}}>
          <EditSaveCancelButton
            isEditing={testcaseEdit.editing}
            loading={saving}
            disableSave={testcaseEdit.hasError()}
            onClickEdit={onClickEdit}
            onClickSave={onClickSave}
            onClickCancel={onClickCancel}/>

          {testcaseEdit.editing ? '' :
            <button className="delete-button button"
              onClick={() => setShowConfirmDeleteModal(true)} disabled={deleting}>
              <span>Delete</span>
              <DotLoader color="#FB5D53" loading={deleting} css={{marginLeft: '10px'}} size={10}/>
            </button>}
        </div>
      </div>
      {
        testcaseEdit.nameErrorMessage ?
          <p className='name-error-message'>{`* ${testcaseEdit.nameErrorMessage}`}</p> : ''
      }

      <div className="testcase-box-in columns testcase-details">
        <div className="column is-desktop subColumn">
          <TestCaseSubtitle title="Limits"/>
          <BulletText title="Time Limit (ms)"
            type="number"
            value={testcaseEdit.timeLimit}
            onChange={(timeLimit) => onTestcaseEdit({timeLimit})}
            isEditing={testcaseEdit.editing}/>
          <BulletText title="Memory Limit (B)"
            type="number"
            value={testcaseEdit.memoryLimit}
            onChange={(memoryLimit) => onTestcaseEdit({memoryLimit})}
            isEditing={testcaseEdit.editing}/>
          <BulletText title="Output Limit (B)"
            type="number"
            value={testcaseEdit.outputLimit}
            onChange={(outputLimit) => onTestcaseEdit({outputLimit})}
            isEditing={testcaseEdit.editing}/>
          <TestCaseSubtitle title="Grade"/>
          <BulletText title="Grade"
            type="number"
            value={testcaseEdit.grade}
            onChange={(grade) => onTestcaseEdit({grade})}
            isEditing={testcaseEdit.editing}/>
        </div>

        <div className="column is-desktop subColumn">
          <TestCaseSubtitle title="Standard In"/>
          <UploadFileItems buttonName="Standard In " buttonColor="rgba(241, 196, 15, 1)"
            files={stdIns}
            fileRemovable={false}
            onFilesUploaded={e => setStandardInFile(e.target.files[0])}
            multipleFiles={false}
            isEditing={testcaseEdit.editing}/>
          <TestCaseSubtitle title="Standard Out"/>
          <UploadFileItems buttonName="Standard Out " buttonColor="rgba(241, 196, 15, 1)"
            files={stdOuts}
            fileRemovable={false}
            onFilesUploaded={e => setStandardOutFile(e.target.files[0])}
            multipleFiles={false}
            isEditing={testcaseEdit.editing}/>
        </div>

        <div className="column is-desktop subColumn">
          <TestCaseSubtitle title="Input Files"/>
          <UploadFileItems buttonName="Input File " buttonColor="rgba(255, 133, 21, 1)"
            files={inputFiles}
            onFilesUploaded={e => addInputFiles(Array.from(e.target.files))}
            removeFile={removeInputFile}
            multipleFiles={true}
            isEditing={testcaseEdit.editing}/>
          <TestCaseSubtitle title="Output Files"/>
          <UploadFileItems buttonName="Output File " buttonColor="rgba(255, 133, 21, 1)"
            files={outputFiles}
            onFilesUploaded={e => addOutputFiles(Array.from(e.target.files))}
            removeFile={removeOutputFile}
            multipleFiles={true}
            isEditing={testcaseEdit.editing}/>
        </div>
      </div>

      <ConfirmationModal title="The Testcase has not been Saved"
        themeColor='#F2B311'
        themeColorDark='#F2B311'
        data={[
          {
            title: 'If you continue, the testcase will be deleted. ',
            value: `Name: ${testcaseEdit.name}`
          }
        ]}
        show={showConfirmCancelModal}
        onClose={() => setShowConfirmCancelModal(false)}
        onSubmit={() => onTestcaseDeleted(testcaseEdit)}/>

      <DeleteConfirmationModal title="Delete the Testcase"
        data={[
          {
            title: 'Are you sure you want to delete the testcase?',
            value: `Name: ${testcaseEdit.name}`
          }
        ]}
        show={showConfirmDeleteModal}
        onClose={() => setShowConfirmDeleteModal(false)}
        onSubmit={() => deleteTestcaseEdit(testcaseEdit)}/>
    </div>
  );
}

export default TestcaseEditor;
