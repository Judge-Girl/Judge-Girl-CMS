import './TestcaseEditor.scss'
import React, {useState} from "react";
import {useUploads} from "../../../../usecases/UploadFilesUseCase";
import FixedUploadFileItems from "../FixedUploadFileItems";
import {EditorButton} from "../../../commons/EditorButton";
import {FaCircle, FiUpload, VscFileCode} from "react-icons/all";
import {EditSaveCancelButton} from "../../../commons/EditSaveCancelButton";
import IconTextItems from "../../../../commons/TextInputForm/IconTextItems";

const TestCaseName = ({name, isEditing}) => {
    return (
        <div className="testcase-name">
            Testcase Name
            {isEditing ?
                <input className="testcase-name-input" value={name}/>
                :
                <span>{name}</span>
            }
        </div>
    )
}

const TestCaseSubtitle = ({title}) => {
    return <>
        <div className="testcase-subtitle">{title}</div>
        <hr/>
    </>
}

const InlineText = ({title, value, onChange, isEditing}) => {
    return (
        isEditing ?
            <div className="inline-text">
                <FaCircle size={6}/>
                <span>{title}</span>
                <input type={"text"} value={value} onChange={onChange} placeholder={0}/>
            </div>
            :
            <div className="inline-text">
                <FaCircle size={6}/>
                <span>{title}: {value}</span>
            </div>
    )
}

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
}

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
}

function TestcaseEditor({testcase, deleteTestcase}) {
    const {files, addFile, removeFile} = useUploads();
    const [isEditing, setIsEditing] = useState(true);

    const onClickEdit = () => {
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setIsEditing(false);
    };

    const onChange = () => {

    };

    return (
        <div key={testcase.id} className={`testcase-editor ${isEditing ? "" : "testcase-view"}`}>
            <div className="testcase-name-row">
                <TestCaseName name={testcase.name} isEditing={isEditing}/>

                <div style={{justifyContent: "flex-end", display: "flex"}}>
                    <EditSaveCancelButton
                        isEditing={isEditing}
                        onClickEdit={onClickEdit}
                        onClickSave={onClickSave}
                        onClickCancel={onClickCancel}/>

                    {isEditing ? "" :
                        <EditorButton text="Delete"
                                      width="70px"
                                      height="36px"
                                      borderRadius="50px"
                                      fontColor="#FB5D53"
                                      borderColor="#FB5D53"
                                      marginLeft="10px"
                                      onClick={deleteTestcase}/>}
                </div>
            </div>
            <div className="testcase-box-in columns testcase-details">
                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Limits"/>
                    <InlineText title="Time Limit"
                                value={testcase.timeLimit}
                                onChange={onChange()}
                                isEditing={isEditing}/>
                    <InlineText title="Memory Limit"
                                value={testcase.memoryLimit}
                                onChange={onChange()}
                                isEditing={isEditing}/>
                    <InlineText title="Output Limit"
                                value={testcase.outputLimit}
                                onChange={onChange()}
                                isEditing={isEditing}/>
                    <TestCaseSubtitle title="Grade"/>
                    <InlineText title="Grade"
                                value={testcase.grade}
                                onChange={onChange()}
                                isEditing={isEditing}/>
                </div>

                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Standard In"/>
                    <UploadFileItems buttonName="Standard In " buttonColor="rgba(241, 196, 15, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile} isEditing={isEditing}/>
                    <TestCaseSubtitle title="Standard Out"/>
                    <UploadFileItems buttonName="Standard Out " buttonColor="rgba(241, 196, 15, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile} isEditing={isEditing}/>
                </div>

                <div className="column is-desktop subColumn">
                    <TestCaseSubtitle title="Input Files"/>
                    <UploadFileItems buttonName="Input File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile} isEditing={isEditing}/>
                    <TestCaseSubtitle title="Output Files"/>
                    <UploadFileItems buttonName="Output File " buttonColor="rgba(255, 133, 21, 1)"
                                     files={files} addFile={addFile} removeFile={removeFile} isEditing={isEditing}/>
                </div>
            </div>
        </div>)
}

export default TestcaseEditor;
