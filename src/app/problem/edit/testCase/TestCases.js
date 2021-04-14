import {TestCaseSubtitleLine} from "../../../commons/titles/TitleLine";
import React from "react";
import './TestCase.css';
import {InlineInputBox} from "../InlineInputBox";
import {UploadFileButton} from "../UploadFileButton";
import {EditorButton} from "../EditorButton";

function TestCases({testCasesItems, removeTestCase}) {
    return testCasesItems.map((testCaseId) => (
        <div className="test-case-box-out" key={testCaseId}>
            <div >
                <span className="test-case-ame">Test Case Name</span>
                <input className="text-case-name-input" />
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
                        width={110} height={28}
                        buttonColor={"#F2B311"}
                        borderRadius={10}
                        fontWeight={600}
                        fontSize={12}
                        lineHeight={18}
                        fontColor={"white"}
                        display={"flex"}
                    />
                    <TestCaseSubtitleLine title="Standard Out"/>
                    <UploadFileButton
                        title={"Standard Out +"}
                        width={110} height={28}
                        buttonColor={"#F2B311"}
                        borderRadius={10}
                        fontWeight={600}
                        fontSize={12}
                        lineHeight={18}
                        fontColor={"white"}
                        display={"flex"}
                    />

                </div>
                <div className="column">
                    <TestCaseSubtitleLine title="Input Files"/>
                    <UploadFileButton
                        title={"Input Files +"}
                        width={110} height={28}
                        borderRadius={10}
                        fontWeight={600}
                        fontSize={12}
                        lineHeight={18}
                        fontColor={"white"}
                        display={"flex"}
                    />
                    <TestCaseSubtitleLine title="Output Files"/>
                    <UploadFileButton
                        title={"Output Files +"}
                        width={110} height={28}
                        borderRadius={10}
                        fontWeight={600}
                        fontSize={12}
                        lineHeight={18}
                        fontColor={"white"}
                        display={"flex"}
                    />
                </div>
            </div>
            <div className="is-pulled-right is-flex">
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
                    onClickFunc={() => removeTestCase(testCaseId)}
                />
            </div>
        </div>
    ));
}

export default TestCases;