import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import './Description.scss';
import {EditorButton} from "./EditorButton";
import {problemEditorService} from "../../../services/services";

function Tabs({textareaVal, setTextareaVal}) {
    const [toggleState, setToggleState] = useState(1);

    const handleTextareaChange = e => {
        setTextareaVal(e.target.value);
    };

    const TAB_WRITE = 1, TAB_PREVIEW = 2;

    return (
        <div>
            <div className="tabs is-boxed">
                <ul>
                    <li className={toggleState === TAB_WRITE ? "is-active active-tabs" : ""}>
                        <p className="tab-write"
                            onClick={() => setToggleState(TAB_WRITE)}
                        >
                            Write
                        </p>
                    </li>
                    <li className={toggleState === TAB_PREVIEW ? "is-active active-tabs" : ""}>
                        <p className="tab-preview"
                            onClick={() => setToggleState(TAB_PREVIEW)}
                        >
                            Preview
                        </p>
                    </li>
                </ul>
            </div>

            <div className="content-tabs">
                <div
                    className={toggleState === TAB_WRITE ? "content  active-textarea" : "content"}
                >
                    <textarea
                        className="description-textarea"
                        value={textareaVal}

                        onChange={handleTextareaChange}
                    />
                </div>

                <div
                    className={toggleState === TAB_PREVIEW ? "content  active-markdown" : "content"}
                >
                    <ReactMarkdown>
                        {textareaVal}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

function Description({problemId}) {
    // TODO: problemEditorService.getProblemDescription
    const [editingState, setEditingState] = useState(true);
    const [textareaVal, setTextareaVal] = useState('Press Edit Description to start writing the description. :smile: Styling with Markdown is supported. :+1:\n');
    const [lastTextareaVal, setLastTextareaVal] = useState(textareaVal);

    const handleDescription = e => {
        e.preventDefault();
        // prevent empty problem name
        if (textareaVal === '') {
            return;
        }

        setEditingState(false);

        problemEditorService.modifyProblemDescription(problemId, textareaVal)
            .then();
    };

    if (!editingState) {
        return (
            <div>
                <SubtitleLine title={"Description"}/>
                <div className="content-tabs">
                    <div
                        className={"content  active-markdown"}
                    >
                        <ReactMarkdown>
                            {textareaVal}
                        </ReactMarkdown>
                    </div>
                    <div className="is-pulled-right">
                        <EditorButton
                            text={"Edit Description"}
                            buttonColor={"#F2B311"}
                            fontColor={"#FFFFFF"}
                            width={209} height={33}
                            fontSize={15}
                            borderRadius={20}
                            borderColor={"#F2B311"}
                            marginTop={15}
                            onClickFunc={() => {
                                setEditingState(true);
                                setLastTextareaVal(textareaVal);
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <SubtitleLine title={"Description"}/>
            <Tabs textareaVal={textareaVal} setTextareaVal={setTextareaVal}/>
            <div className="field is-grouped is-align-items-center is-pulled-right is-paddingless">
                <EditorButton
                    text={"Save"}
                    buttonColor={"#96D745"}
                    fontColor={"#FFFFFF"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    marginTop={15} marginRight={4}
                    onClickFunc={e => handleDescription(e)}
                />
                <EditorButton
                    text={"Cancel"}
                    buttonColor={"#FFFFFF"}
                    fontColor={"#A2A3B1"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    borderColor={"#A2A3B1"}
                    marginTop={15} marginLeft={4}
                    onClickFunc={() => {
                        setEditingState(false);
                        setTextareaVal(lastTextareaVal);
                    }}
                />
            </div>
        </div>
    )
}

export default Description;
