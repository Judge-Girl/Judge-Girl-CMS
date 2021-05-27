import {TestCaseSubtitleLine} from "../../../commons/titles/TitleLine";
import React from "react";
import './TestCase.css';
import {InlineInputBox} from "../InlineInputBox";
import {UploadFileButton} from "../UploadFileButton";
import {EditorButton} from "../EditorButton";

function TestCases({testCasesItems, removeTestCase}) {
    return testCasesItems.map((testCaseId) => (
        <div key={testCaseId}
             className="test-case-box-out"
             style={{display: "flex", flexDirection: "column"}}>
            <div style={{
                display: "flex", justifyContent: "flex-start", alignItems: "center",
                padding: "1% 0 3px 15px", whiteSpace: "nowrap"
            }}>
                <span className="test-case-name">Test Case Name</span>
                <input className="text-case-name-input" style={{marginLeft: "5px"}}/>
            </div>
            <div className="test-case-box-in columns">
                <div className="column is-two-fifths">
                    <TestCaseSubtitleLine title="Limits"/>
                    <InlineInputBox title="Time Limit" fontSize={14}/>
                    <InlineInputBox title="Memory Limit" fontSize={14}/>
                    <InlineInputBox title="Output Limit" fontSize={14}/>

                    <TestCaseSubtitleLine title="Grade" fontSize={15}/>
                    <InlineInputBox title="Grade" fontSize={14}/>
                </div>
                <div className="column">
                    <TestCaseSubtitleLine title="Standard In"/>
                    <UploadFileButton
                        title={"Standard In +"}
                        className={"test-case-upload-button"}
                        buttonColor={"#F2B311"}
                    />
                    <TestCaseSubtitleLine title="Standard Out"/>
                    <UploadFileButton
                        title={"Standard In +"}
                        className={"test-case-upload-button"}
                        buttonColor={"#F2B311"}
                    />

                </div>
                <div className="column">
                    <TestCaseSubtitleLine title="Input Files"/>
                    <UploadFileButton
                        title={"Input Files +"}
                        className={"test-case-upload-button"}
                        buttonColor={"#3EBDD9"}
                    />
                    <TestCaseSubtitleLine title="Output Files"/>
                    <UploadFileButton
                        title={"Output Files +"}
                        className={"test-case-upload-button"}
                        buttonColor={"#3EBDD9"}
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
                    onClickFunc={() => removeTestCase(testCaseId)}
                />
            </div>
        </div>
    ));
}

export default TestCases;
