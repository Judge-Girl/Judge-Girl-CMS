import {EditorButton} from "../../problem/edit/EditorButton";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {useState} from "react";
import {problemService} from "../../../services/services";
import {FaEdit} from "react-icons/all";


const ProblemTitle = () => {
    const {currentProblem, fetchProblems} = useProblemEditorContext();
    const [problemTitle, setProblemTitle] = useState(currentProblem.title);
    const [isEditing, setIsEditing] = useState(false);

    const onClickSave = () => {
        if (problemTitle.length === 0) {
            return;
        }
        problemService.modifyProblemTitle(currentProblem.id, problemTitle)
            .then(() => {
                console.log("The problem's title has been modified");
                fetchProblems();
            });
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setProblemTitle(currentProblem.title);
        setIsEditing(false);
    }

    return <>
        <div className="problem-editor-title">
        {isEditing?
            <form className="field is-grouped is-align-items-center">
                <input
                    className="save-problem-name-btn"
                    type="text"
                    value={problemTitle}
                    onChange={e => setProblemTitle(e.target.value)}
                    required
                />
                {/* TODO: Vertical Centering. */}
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <EditorButton text="Save"
                                  buttonColor="rgba(88, 214, 141, 1)"
                                  fontColor="#FFF"
                                  width="70px"
                                  height="36px"
                                  borderRadius="50px"
                                  onClick={onClickSave}/>
                    <EditorButton text="Cancel"
                                  fontColor="rgba(124,124,124,1)"
                                  width="87px"
                                  height="36px"
                                  borderRadius="50px"
                                  marginLeft="10px"
                                  onClick={onClickCancel}/>
                </div>
            </form>
            :
            <div className="problem-name-title">
                <div>
                    {problemTitle}
                </div>
                <FaEdit className="problem-name-editor-btn"
                        onClick={() => setIsEditing(true)} />
            </div>
        }
        </div>
    </>;
};

export default ProblemTitle;
