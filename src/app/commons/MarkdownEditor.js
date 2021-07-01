import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
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
                        <p className="tab-write" onClick={() => setToggleState(TAB_WRITE)}>Write</p>
                    </li>
                    <li className={toggleState === TAB_PREVIEW ? "is-active active-tabs" : ""}>
                        <p className="tab-preview" onClick={() => setToggleState(TAB_PREVIEW)}>Preview</p>
                    </li>
                </ul>
            </div>
            <div className="content-tabs">
                <div className={(toggleState === TAB_WRITE ? "active-textarea" : "hide")}>
                    <textarea className="description-textarea"
                              value={textareaVal}
                              onChange={handleTextareaChange}
                              style={{backgroundColor: "white"}}/>
                </div>
                <div className={(toggleState === TAB_PREVIEW ? "active-markdown" : "hide")}>
                    <ReactMarkdown>{textareaVal}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
}

const MarkdownEditor = ({text, editingState, onTextChanged, editorButtons, style}) => {

    if (!editingState) {
        return (
            <div className="markdown-editor font-poppins">
                <div className="content-tabs">
                    <div className="active-markdown" style={style}>
                        <ReactMarkdown>{text}</ReactMarkdown>
                    </div>
                    <div className="is-pulled-right">
                        {editorButtons}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="markdown-editor font-poppins">
            <Tabs textareaVal={text} setTextareaVal={onTextChanged}/>
            <div className="field is-grouped is-align-items-center is-pulled-right is-paddingless">
                {editorButtons}
            </div>
        </div>
    )
};

export default MarkdownEditor;
