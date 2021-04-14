import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import './Description.scss';

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [textareaVal, setTextareaVal] = useState('');

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const handleTextareaChange = e => {
        setTextareaVal(e.target.value);
    };

    const TAB_WRITE = 1, TAB_PREVIEW = 2;

    return (
        <div>
            <div className="tabs is-boxed">
                <ul>
                    <li className={toggleState === TAB_WRITE ? "is-active" : ""}>
                        <a href={() => false}>
                            <span
                                onClick={() => toggleTab(TAB_WRITE)}
                            >
                                Write
                            </span>
                        </a>
                    </li>
                    <li className={toggleState === TAB_PREVIEW ? "is-active" : ""}>
                        <a href={() => false}>
                            <span
                                onClick={() => toggleTab(TAB_PREVIEW)}
                            >
                                Preview
                            </span>
                        </a>
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
