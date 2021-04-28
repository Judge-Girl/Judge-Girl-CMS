import React, {useState} from 'react';
import '../../ProblemEditor.css';
import './ProblemEditorTitle.css';
import {EditorButton} from "../EditorButton";

function ProblemTitleForm ({setProblemName, setEditingState}) {
    return (
        <div>
            <form className="field is-grouped is-align-items-center">
                <input
                    className="save-problem-name-btn "
                    type="text"
                />
                <EditorButton
                    text={"Save"}
                    buttonColor={"#96D745"}
                    fontColor={"#FFFFFF"}
                    width={75} height={33}
                    fontSize={15}
                    borderRadius={20}
                    margin={7}
                />
                <EditorButton
                    text={"Cancel"}
                    buttonColor={"#FFFFFF"}
                    fontColor={"#A2A3B1"}
                    width={75} height={33}
                    fontSize={15}
                    borderRadius={20}
                    borderColor={"#A2A3B1"}
                    margin={7}
                    onClickFunc={() => setEditingState(false)}
                />

            </form>
        </div>
    )
}

export default ProblemTitleForm;
