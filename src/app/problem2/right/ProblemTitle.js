import {EditorButton} from "../../problem/edit/EditorButton";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {useState} from "react";
import {problemService} from "../../../services/services";
import {FaEdit} from "react-icons/all";


const ProblemTitle = () => {
    const {currentProblem, fetchProblems} = useProblemEditorContext();
    const [problemTitle, setProblemTitle] = useState(currentProblem.title);
    const [isEditing, setIsEditing] = useState(false);

    const onSaveClick = () => {
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

    const onCancelClick = () => {
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
                <EditorButton text="Save"
                              buttonColor={"#96D745"}
                              width={75} height={33}
                              fontSize={15}  fontColor={"#FFFFFF"}
                              marginLeft={7} marginBottom={20}
                              borderRadius={20}
                              onClick={onSaveClick}/>
                <EditorButton text="Cancel"
                              buttonColor={"#FFFFFF"}
                              width={75} height={33}
                              fontSize={15} fontColor={"#A2A3B1"}
                              marginLeft={7} marginBottom={20}
                              borderRadius={20} borderColor={"#A2A3B1"}
                              onClick={onCancelClick}/>
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
}

export default ProblemTitle;
