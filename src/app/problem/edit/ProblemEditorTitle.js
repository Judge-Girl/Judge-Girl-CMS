import React, {useState} from 'react';
import '../ProblemEditor.css';
import './ProblemEditorTitle.scss';
import {FaEdit} from "react-icons/all";
import {EditorButton} from "./EditorButton";
import {problemService} from "../../../services/services";

function ProblemEditorTitle ({problemId}) {
    // TODO: problemService.getProblemTitle
    const [problemNameInput, setProblemNameInput] = useState('Negative and Positive');
    const [lastProblemNameInput, setLastProblemNameInput] = useState(problemNameInput);
    const [editingState, setEditingState] = useState(false);

    const handleSaveProblemName = (e) => {
        e.preventDefault();
        // TODO: empty problem name notification
        if (problemNameInput === '') {
            return;
        }

        setEditingState(false);

        problemService.modifyProblemTitle(problemId, problemNameInput)
            .then();
    };

    if (editingState) {
        return (
            <div>
                <form className="field is-grouped is-align-items-center">
                    <input
                        className="save-problem-name-btn "
                        type="text"
                        value={problemNameInput}
                        onInput={e => setProblemNameInput(e.target.value)}
                    />
                    <EditorButton
                        text={"Save"}
                        buttonColor={"#96D745"}
                        fontColor={"#FFFFFF"}
                        width={75} height={33}
                        fontSize={15}
                        borderRadius={20}
                        marginLeft={7}
                        marginBottom={20}
                        onClickFunc={e => handleSaveProblemName(e)}
                    />
                    <EditorButton
                        text={"Cancel"}
                        buttonColor={"#FFFFFF"}
                        fontColor={"#A2A3B1"}
                        width={75} height={33}
                        fontSize={15}
                        borderRadius={20}
                        borderColor={"#A2A3B1"}
                        marginLeft={7}
                        marginBottom={20}
                        onClickFunc={() => {
                            setEditingState(false);
                            setProblemNameInput(lastProblemNameInput);
                        }}
                    />

                </form>
            </div>
        )
    }

    return (
        <div className={"title problem-editor-title"}>
            <div>
                {problemNameInput}
            </div>
            <FaEdit
                onClick={() => {
                    setEditingState(true);
                    setLastProblemNameInput(problemNameInput);
                }}
                className="problem-name-editor-btn"
            />
        </div>
    )
}

export default ProblemEditorTitle;
