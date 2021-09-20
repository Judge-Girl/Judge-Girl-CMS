import './TestcaseEditor.scss'
import React from "react";
import {useUploads} from "../../../../usecases/UploadFilesUseCase";
import ProvidedCodeItems from "../ProvidedCodeItems";
import {EditorButton} from "../../../commons/EditorButton";
import {FiUpload, FaCircle} from "react-icons/all";


const UploadFileButton = ({buttonName, color, addFile}) => {
    return <EditorButton text={<div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
        {buttonName} <FiUpload size={15}/></div>}
                         type="file"
                         buttonColor={color}
                         fontSize="13px"
                         fontColor="#fff"
                         width="10em"
                         height="26px"
                         borderRadius="50px"
                         onClick={addFile}/>
}

const InputLine = ({title, value, onChange}) => {
    return <>
        <div className="inline-input">
            <FaCircle size={6}/>
            <span>{title}</span>
            <input className="" type={"text"} value={value} onChange={onChange}/>
        </div>
    </>
}

function TestcaseEditor({testcase, deleteTestcase}) {
    const {files, addFile, removeFile} = useUploads();

    const onChange = () => {

    }

    return (
        <div key={testcase.id} className="testcase-editor">
            <div className="testcase-name">
                Testcase Name
                <input className="testcase-name-input" value={testcase.name}/>

            </div>
            <div className="testcase-box-in columns">
                <div className="column is-desktop">
                    <div className="testcase-subtitle">Limits</div>
                    <hr/>
                    <InputLine title="Time Limit" value={testcase.timeLimit} onChange={onChange()}/>
                    <InputLine title="Memory Limit" value={testcase.memoryLimit} onChange={onChange()}/>
                    <InputLine title="Output Limit" value={testcase.outputLimit} onChange={onChange()}/>

                    <div className="testcase-subtitle">Grade</div>
                    <hr/>
                    <InputLine title="Grade" value={testcase.grade} onChange={onChange()}/>
                </div>

                <div className="column is-desktop">
                    <div className="testcase-subtitle">Standard In</div>
                    <hr/>
                    <ProvidedCodeItems files={files} removeFile={removeFile}/>
                    <UploadFileButton buttonName="Input Files "
                                      color="rgba(241, 196, 15, 1)"
                                      addFile={addFile}/>

                    <div className="testcase-subtitle">Standard Out</div>
                    <hr/>
                    <ProvidedCodeItems files={files} removeFile={removeFile}/>
                    <UploadFileButton buttonName="Input Files "
                                      color="rgba(241, 196, 15, 1)"
                                      addFile={addFile}/>
                </div>

                <div className="column is-desktop">
                    <div className="testcase-subtitle">Input Files</div>
                    <hr/>
                    <ProvidedCodeItems files={files} removeFile={removeFile}/>
                    <UploadFileButton buttonName="Input Files "
                                      color="rgba(255, 133, 21, 1)"
                                      addFile={addFile}/>

                    <div className="testcase-subtitle">Output Files</div>
                    <hr/>
                    <ProvidedCodeItems files={files} removeFile={removeFile}/>
                    <UploadFileButton buttonName="Input Files "
                                      color="rgba(255, 133, 21, 1)"
                                      addFile={addFile}/>

                </div>
            </div>
        </div>)
}

export default TestcaseEditor;
