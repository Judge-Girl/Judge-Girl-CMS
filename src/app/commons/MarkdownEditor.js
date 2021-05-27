import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import {EditorButton} from "../problem/edit/EditorButton";
import {problemService} from "../../services/services";
import './MarkdwonEditor.scss';

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
                <div className={(toggleState === TAB_WRITE ? "active-textarea" : "hide")}>
                    <textarea
                        className="description-textarea"
                        value={textareaVal}
                        onChange={handleTextareaChange}
                        style={{backgroundColor: "white"}}
                    />
                </div>

                <div className={(toggleState === TAB_PREVIEW ? "active-markdown" : "hide")}

                >
                    <ReactMarkdown>
                        {textareaVal}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

const MarkdownEditor = ({style}) => {
    // TODO: problemService.getProblemDescription
    const [editingState, setEditingState] = useState(false);
    const [textareaVal, setTextareaVal] = useState('Press Edit Description to start writing the description. Styling with Markdown is supported.\n');
    const [lastTextareaVal, setLastTextareaVal] = useState(textareaVal);

    const handleDescription = e => {
        e.preventDefault();
        // TODO: empty description notification
        if (textareaVal.length === 0) {
            return;
        }

        setEditingState(false);

        problemService.modifyProblemDescription(0, textareaVal)
            .then(() => console.log("The problem's description has been modified"));
    };

    if (!editingState) {
        return (
            <div className="markdown-editor font-poppins" style={style}>
                <div className="content-tabs">
                    <div className="active-markdown">
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
                            onClick={() => {
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
        <div className="markdown-editor font-poppins" style={style}>
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
                    onClick={e => handleDescription(e)}
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
                    onClick={() => {
                        setEditingState(false);
                        setTextareaVal(lastTextareaVal);
                    }}
                />
            </div>
        </div>
    )
};

export default MarkdownEditor;
