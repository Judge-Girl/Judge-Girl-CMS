import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import './Description.css';

function Tabs() {
    const [toggleState, setToggleState] = useState(1);
    const [textareaVal, setTextareaVal] = useState('');

    const toggleTab = (index) => {
        setToggleState(index);
    }

    const handleTextareaChange = e => {
        setTextareaVal(e.target.value);
    };

    return (
        <div>
            <div className="tabs is-boxed">
                <ul>
                    <li className={toggleState === 1 ? "is-active" : ""}>
                        <a>
                            <span
                                /* TODO: the tabs part (.tabs, .active-tabs, .description-button) */
                                // className={"description-button tabs " + (toggleState === 1 ? "active-tabs" : "")}
                                onClick={() => toggleTab(1)}
                            >
                                Write
                            </span>
                        </a>
                    </li>
                    <li className={toggleState === 2 ? "is-active" : ""}>
                        <a>
                            <span
                                // className={"description-button tabs " + (toggleState === 1 ? "active-tabs" : "")}
                                onClick={() => toggleTab(2)}
                            >
                                Preview
                            </span>
                        </a>
                    </li>
                </ul>
            </div>


            <div className="content-tabs">
                <div
                    className={toggleState === 1 ? "content  active-textarea" : "content"}
                >
                    <textarea
                        className="description-textarea"
                        value={textareaVal}
                        onChange={handleTextareaChange}
                    />
                </div>

                <div
                    className={toggleState === 2 ? "content  active-markdown" : "content"}
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
