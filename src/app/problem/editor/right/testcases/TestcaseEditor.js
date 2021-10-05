import './TestcaseEditor.scss';
import React, {useState} from "react";
import FixedUploadFileItems from "../FixedUploadFileItems";
import {FaCircle, FiUpload, VscFileCode} from "react-icons/all";
import {EditSaveCancelButton} from "../../../commons/EditSaveCancelButton";
import IconTextItems from "../../../../commons/TextInputForm/IconTextItems";
import {useTestcaseIosPatch} from "./usecase";
import Testcase from "../../../../../models/Testcase";


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

function TestcaseEditor({
                            problemService, initialTestcaseEdit,
                            onTestcaseDeleted
                        }) {
    const [loading, setLoading] = useState(false);
    const [testcaseEdit, setTestcaseEdit] = useState(initialTestcaseEdit);
    const {
        createTestcaseIOsPatch, inputFiles, addInputFiles, removeInputFile,
        outputFiles, addOutputFiles, removeOutputFile,
        stdIns, setStandardInFile, stdOuts, setStandardOutFile, reset: resetTestcaseIOsPatching
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

        if (shouldSave) {
            setLoading(true);
            if (testcaseEdit.edited) {
                saveTestcase(new Testcase(testcaseEdit));
            }
            if (!testcaseIOsPatch.isEmpty()) {
                patchTestcaseIOs(testcaseIOsPatch);
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
            // TODO, pop-up a dialog to confirm the deletion
            // for the new testcaseEdit, should delete it on cancellation.
            onTestcaseDeleted(testcaseEdit);
        }
    };

    const onTestcaseEdit = (edition) => {
        setTestcaseEdit(testcaseEdit.edit(edition));
    };

    const saveTestcase = (testcase) => {
        problemService.saveTestcase(testcase)
            .then(() => {
                setLoading(false);
                setTestcaseEdit(testcaseEdit.save());
            })
            .catch(error => {
                setLoading(false);
                alert(error.message);
                setTestcaseEdit(testcaseEdit.error(error.message));
            });
    };

    const patchTestcaseIOs = (testcaseIOsPatch) => {
        problemService.patchTestcaseIOs(testcaseIOsPatch)
            .then((patchedTestcase) => {
                setLoading(false);
                Object.assign(testcaseEdit, patchedTestcase);
                setTestcaseEdit(testcaseEdit.save());
                resetTestcaseIOsPatching();
            })
            .catch(error => {
                setLoading(false);
                alert(error.message);
                setTestcaseEdit(testcaseEdit.error(error.message));
            });
    };

    return (
        <div key={testcaseEdit.id} className={`testcase-editor 
        ${testcaseEdit.editing ? "" : "testcaseEdit-view"} 
        ${testcaseEdit.hasError() ? "cannot-save" : "can-save"}`}>
            <div className="testcase-name-row">
                <TestCaseName name={testcaseEdit.name} isEditing={testcaseEdit.editing}
                              onChange={(name) => onTestcaseEdit({name})}
                />

                <div style={{justifyContent: "flex-end", display: "flex"}}>
                    <EditSaveCancelButton
                        isEditing={testcaseEdit.editing}
                        loading={loading}
                        onClickEdit={onClickEdit}
                        onClickSave={onClickSave}
                        onClickCancel={onClickCancel}/>

                    {testcaseEdit.editing ? "" :
                        <button className="button delete-button"
                                onClick={() => onTestcaseDeleted(testcaseEdit)}>Delete</button>}
                </div>
            </div>
            {
                testcaseEdit.nameErrorMessage ?
                    <p className='name-error-message'>{`* ${testcaseEdit.nameErrorMessage}`}</p> : ""
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
        </div>)
}

export default TestcaseEditor;
