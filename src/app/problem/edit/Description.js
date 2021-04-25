import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import './Description.scss';

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [textareaVal, setTextareaVal] = useState('Press Edit Description to start writing the description. :smile: Styling with Markdown is supported. :+1:\n');

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

function Description() {
    return (
        <div>
            <SubtitleLine title={"Description"}/>
            <Tabs />
        </div>
    )
}

export default Description;
