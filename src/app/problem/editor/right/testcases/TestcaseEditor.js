import './TestcaseEditor.scss'
import React, {useState} from "react";
import {useUploads} from "../../../../usecases/UploadFilesUseCase";
import FixedUploadFileItems from "../FixedUploadFileItems";
import {EditorButton} from "../../../commons/EditorButton";
import {FaCircle, FiUpload, VscFileCode} from "react-icons/all";
import {EditSaveCancelButton} from "../../../commons/EditSaveCancelButton";
import IconTextItems from "../../../../commons/TextInputForm/IconTextItems";

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

const UploadFileButton = ({buttonName, buttonColor, addFile}) => {
    return <EditorButton
        text={
            <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                {buttonName} <FiUpload size={18} style={{paddingLeft: "3px"}}/>
            </div>}
        type="file"
        buttonColor={buttonColor}
        fontSize="14px"
        fontColor="#fff"
        width="fit-content"
        height="28px"
        borderRadius="50px"
        onClick={addFile}/>
};

const UploadFileItems = ({buttonName, buttonColor, files, addFile, removeFile, isEditing}) => {
    return (
        isEditing ?
            <>
                <FixedUploadFileItems files={files} removeFile={removeFile} style={{marginBottom: "5px"}}/>
                <UploadFileButton buttonName={buttonName}
                                  buttonColor={buttonColor}
                                  addFile={addFile}/>
            </>
            :
            <IconTextItems icon={<VscFileCode size={18}/>}
                           items={files.map(file => file.name)}/>
    )
};

function TestcaseEditor({initialTestcase, onTestcaseSaved, onTestcaseDeleted}) {
    const [edited, setEdited] = useState(false);
    const [beforeSaveTestcase, setBeforeSaveTestcase] = useState(initialTestcase);
    const [testcase, setTestcase] = useState(initialTestcase);
    const {files, addFile, removeFile} = useUploads();

    const onClickEdit = () => {
        setEdited(false); // reset the 'edited' state
        setTestcase({...testcase, editing: true});
    };

    const onClickSave = () => {
        // if the testcase is not edited during the editing state,
        // then we don't have to trigger the "onTestcaseSaved" event.
        if (edited ||
            // for the new testcase, should save it on the first edition
            !testcase.saved) {
            const savedTestcase = {...testcase, saved: true, editing: false};
            setTestcase(savedTestcase);
            setBeforeSaveTestcase(savedTestcase);
            onTestcaseSaved(testcase);
        } else {
            setTestcase({...testcase, editing: false});
        }
    };

    const onClickCancel = () => {
        // restore to the before-save one
        setTestcase({...beforeSaveTestcase, editing: false});
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
                        <EditorButton text="Delete"
                                      width="70px"
                                      height="36px"
                                      borderRadius="50px"
                                      fontColor="#FB5D53"
                                      borderColor="#FB5D53"
                                      marginLeft="10px"
                                      onClick={() => onTestcaseDeleted(testcase)}/>}
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
                                     files={files} addFile={addFile} removeFile={removeFile}
                                     isEditing={testcase.editing}/>
                    <TestCaseSubtitle title="Standard Out"/>
                    <UploadFileItems buttonName="Standard Out " buttonColor="rgba(241, 196, 15, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile}
                                     isEditing={testcase.editing}/>
                </div>

                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Input Files"/>
                    <UploadFileItems buttonName="Input File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile}
                                     isEditing={testcase.editing}/>
                    <TestCaseSubtitle title="Output Files"/>
                    <UploadFileItems buttonName="Output File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile}
                                     isEditing={testcase.editing}/>
                </div>
            </div>
        </div>)
}

export default TestcaseEditor;
