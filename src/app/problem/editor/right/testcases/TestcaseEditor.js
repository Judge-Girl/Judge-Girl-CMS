import './TestcaseEditor.scss';
import React, {useState} from "react";
import FixedUploadFileItems from "../FixedUploadFileItems";
import {FaCircle, FiUpload, VscFileCode} from "react-icons/all";
import {EditSaveCancelButton} from "../../../commons/EditSaveCancelButton";
import IconTextItems from "../../../../commons/TextInputForm/IconTextItems";
import {useTestcaseIosPatch} from "./usecase";

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
    )
};

const TestCaseSubtitle = ({title}) => {
    return <>
        <div className="testcase-subtitle">{title}</div>
        <hr/>
    </>
};

const BulletText = ({title, value, onChange, isEditing, type = "text"}) => {
    return (
        isEditing ?
            <div className="bullet-text">
                <FaCircle size={6}/>
                <span>{title}</span>
                <input type={type} value={value} onChange={e => {
                    const value = type === "number" ? parseInt(e.target.value) : e.target.value;
                    onChange(value);
                }}
                       placeholder={0}/>
            </div>
            :
            <div className="bullet-text">
                <FaCircle size={6}/>
                <span>{title}: {value}</span>
            </div>
    )
};

const UploadFileButton = ({buttonName, buttonColor, onFilesUploaded, multipleFiles}) => {
    return <label>
        <input type="file"
               style={{cursor: "pointer", display: "none"}}
               onChange={onFilesUploaded} multiple={multipleFiles}/>
        <div className="upload-file-button" style={{background: buttonColor}}>
            {buttonName} <FiUpload size={18} style={{paddingLeft: "3px"}}/>
        </div>
    </label>
};

const UploadFileItems = ({buttonName, buttonColor, files, onFilesUploaded, removeFile, isEditing, multipleFiles, fileRemovable = true}) => {
    return (
        isEditing ?
            <>
                {console.log(files)}
                <FixedUploadFileItems items={files.map(f => {
                    return {key: f.name, text: f.name}
                })} fileRemovable={fileRemovable} removeItem={item => removeFile(item.text)}
                                      style={{marginBottom: "5px"}}/>
                <UploadFileButton buttonName={buttonName}
                                  buttonColor={buttonColor}
                                  onFilesUploaded={onFilesUploaded}
                                  multipleFiles={multipleFiles}/>
            </>
            :
            <IconTextItems icon={<VscFileCode size={18}/>}
                           items={files.map(file => file.name)}/>
    )
};

function TestcaseEditor({initialTestcase, onTestcaseSaved, onTestcaseIOsPatched, onTestcaseDeleted}) {
    const [testcaseEdited, setEdited] = useState(false);
    const [beforeSaveTestcase, setBeforeSaveTestcase] = useState(initialTestcase);
    const [testcase, setTestcase] = useState(initialTestcase);
    const {
        createTestcaseIOsPatch, inputFiles, addInputFiles, removeInputFile,
        outputFiles, addOutputFiles, removeOutputFile,
        stdIns, setStandardInFile, stdOuts, setStandardOutFile, reset: resetTestcaseIOs
    } = useTestcaseIosPatch(initialTestcase);


    const onClickEdit = () => {
        setEdited(false); // reset the 'edited' state
        setTestcase({...testcase, editing: true});
    };

    const onClickSave = () => {
        const testcaseIosPatch = createTestcaseIOsPatch();

        // if the testcase is not edited during the editing state,
        // then we don't have to trigger the "onTestcaseSaved" event.
        const shouldSave = testcaseEdited || !testcaseIosPatch.isEmpty()
             // for the new testcase, should save it on the first edition
            || !testcase.saved;

        if (shouldSave) {
            const savedTestcase = {...testcase, saved: true, editing: false};
            setTestcase(savedTestcase);
            if (testcaseEdited) {
                setBeforeSaveTestcase(savedTestcase);
                onTestcaseSaved(testcase);
            }
            if (!testcaseIosPatch.isEmpty()) {
                resetTestcaseIOs();
                onTestcaseIOsPatched(testcaseIosPatch);
            }
        } else {
            setTestcase({...testcase, editing: false});
        }
    };

    const onClickCancel = () => {
        // restore to the before-save one
        setTestcase({...beforeSaveTestcase, editing: false});
        resetTestcaseIOs();
        if (!testcase.saved) {
            // for the new testcase, should delete it on cancellation.
            onTestcaseDeleted(testcase);
        }
    };

    const onChange = (newTestcase) => {
        setEdited(true);
        setTestcase(newTestcase);
    };

    return (
        <div key={testcase.id} className={`testcase-editor ${testcase.editing ? "" : "testcase-view"}`}>
            <div className="testcase-name-row">
                <TestCaseName name={testcase.name} isEditing={testcase.editing}
                              onChange={(name) => onChange({...testcase, name})}
                />

                <div style={{justifyContent: "flex-end", display: "flex"}}>
                    <EditSaveCancelButton
                        isEditing={testcase.editing}
                        onClickEdit={onClickEdit}
                        onClickSave={onClickSave}
                        onClickCancel={onClickCancel}/>

                    {testcase.editing ? "" :
                        <button className="button delete-button"
                                onClick={() => onTestcaseDeleted(testcase)}>Delete</button>}
                </div>
            </div>
            <div className="testcase-box-in columns testcase-details">
                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Limits"/>
                    <BulletText title="Time Limit (ms)"
                                type="number"
                                value={testcase.timeLimit}
                                onChange={(timeLimit) => onChange({...testcase, timeLimit})}
                                isEditing={testcase.editing}/>
                    <BulletText title="Memory Limit (B)"
                                type="number"
                                value={testcase.memoryLimit}
                                onChange={(memoryLimit) => onChange({...testcase, memoryLimit})}
                                isEditing={testcase.editing}/>
                    <BulletText title="Output Limit (B)"
                                type="number"
                                value={testcase.outputLimit}
                                onChange={(outputLimit) => onChange({...testcase, outputLimit})}
                                isEditing={testcase.editing}/>
                    <TestCaseSubtitle title="Grade"/>
                    <BulletText title="Grade"
                                type="number"
                                value={testcase.grade}
                                onChange={(grade) => onChange({...testcase, grade})}
                                isEditing={testcase.editing}/>
                </div>

                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Standard In"/>
                    <UploadFileItems buttonName="Standard In " buttonColor="rgba(241, 196, 15, 1)"
                                     files={stdIns}
                                     fileRemovable={false}
                                     onFilesUploaded={e => setStandardInFile(e.target.files[0])}
                                     multipleFiles={false}
                                     isEditing={testcase.editing}/>
                    <TestCaseSubtitle title="Standard Out"/>
                    <UploadFileItems buttonName="Standard Out " buttonColor="rgba(241, 196, 15, 1)"
                                     files={stdOuts}
                                     fileRemovable={false}
                                     onFilesUploaded={e => setStandardOutFile(e.target.files[0])}
                                     multipleFiles={false}
                                     isEditing={testcase.editing}/>
                </div>

                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Input Files"/>
                    <UploadFileItems buttonName="Input File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={inputFiles}
                                     onFilesUploaded={e => addInputFiles(Array.from(e.target.files))}
                                     removeFile={removeInputFile}
                                     multipleFiles={true}
                                     isEditing={testcase.editing}/>
                    <TestCaseSubtitle title="Output Files"/>
                    <UploadFileItems buttonName="Output File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={outputFiles}
                                     onFilesUploaded={e => addOutputFiles(Array.from(e.target.files))}
                                     removeFile={removeOutputFile}
                                     multipleFiles={true}
                                     isEditing={testcase.editing}/>
                </div>
            </div>
        </div>)
}

export default TestcaseEditor;
