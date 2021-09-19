import './TestcaseEditor.scss'
import {TestCaseSubtitleLine} from "../../../../commons/titles/TitleLine";
import {InlineInputBox} from "../../../commons/InlineInputBox";
import {UploadFileButton} from "../UploadFileButton";
import {EditorButton} from "../../../commons/EditorButton";

function TestcaseEditor({testcase, deleteTestcase}) {
    return (
        <div key={testcase.id}
             className="testcase-editor testcase-box-out"
             style={{display: "flex", flexDirection: "column"}}>
            <div style={{
                display: "flex", justifyContent: "flex-start", alignItems: "center",
                padding: "1% 0 3px 15px", whiteSpace: "nowrap"
            }}>
                <span className="testcase-name">Testcase Name</span>
                <input className="testcase-name-input" style={{marginLeft: "5px"}} value={testcase.name}/>
            </div>
            <div className="testcase-box-in columns">
                <div className="column is-two-fifths">
                    <TestCaseSubtitleLine title="Limits"/>
                    <InlineInputBox type="Number" title="Time Limit" fontSize={14} value={testcase.timeLimit}/>
                    <InlineInputBox type="Number" title="Memory Limit" fontSize={14} value={testcase.memoryLimit}/>
                    <InlineInputBox type="Number" title="Output Limit" fontSize={14} value={testcase.outputLimit}/>

                    <TestCaseSubtitleLine title="Grade" fontSize={15}/>
                    <InlineInputBox type="Number" title="Grade" fontSize={14} value={testcase.grade}/>
                </div>
                <div className="column"
                     style={{width: "100px"}}>
                    <TestCaseSubtitleLine title="Standard In"/>
                    <UploadFileButton
                        title={"Standard In +"} className={"testcase-upload-button"} buttonColor={"#F2B311"}
                    />
                    <TestCaseSubtitleLine title="Standard Out"/>
                    <UploadFileButton
                        title={"Standard In +"} className={"testcase-upload-button"} buttonColor={"#F2B311"}
                    />
                </div>
                <div className="column"
                     style={{width: "100px"}}>
                    <TestCaseSubtitleLine title="Input Files"/>
                    <UploadFileButton
                        title={"Standard In +"} className={"testcase-upload-button"} buttonColor={"#3EBDD9"}
                    />
                    <TestCaseSubtitleLine title="Output Files"/>
                    <UploadFileButton
                        title={"Standard In +"} className={"testcase-upload-button"} buttonColor={"#3EBDD9"}
                    />
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "row", marginRight: "10px", alignSelf: "flex-end"}}>
                <EditorButton
                    text={"Save"}
                    buttonColor={"#91CB46"}
                    fontColor={"#FFFFFF"}
                    width={66} height={24}
                    fontSize={12}
                    borderRadius={10}
                />
                <EditorButton
                    text={"Delete"}
                    buttonColor={"#FFFFFF"}
                    fontColor={"#E26C65"}
                    width={66} height={24}
                    fontSize={12}
                    borderRadius={10}
                    borderColor={"#E26C65"}
                    marginLeft={5}
                    onClickFunc={() => deleteTestcase(testcase.id)}
                />
            </div>
        </div>)
}

export default TestcaseEditor;
