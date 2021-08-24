import {useProblemEditorContext} from "../ProblemEditorContext";
import {useState} from "react";
import {problemService} from "../../../services/services";
import {FaEdit} from "react-icons/all";
import {ESCButton} from "../commons/ESCButton";


const ProblemTitle = () => {
    const {currentProblem, fetchProblems} = useProblemEditorContext();
    const [problemTitle, setProblemTitle] = useState(currentProblem.title);
    const [problemTitleBackUp, setProblemTitleBackUp] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);

    const onClickEdit = () => {
        setIsEditing(true);
        setProblemTitleBackUp(problemTitle);
    }

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
        setProblemTitle(problemTitleBackUp);
        setIsEditing(false);
    }

    return <>
        <div className="problem-editor-title">
        {isEditing?
            <form style={{display: "flex", flexDirection:"row", alignItems:"center"}}>
                <input className="save-problem-name-btn"
                       type="text"
                       value={problemTitle}
                       onChange={e => setProblemTitle(e.target.value)}
                       style={{marginBottom: 0}}
                       required/>
                <div style={{width: "20px"}}/>
                <ESCButton
                    isEditing={isEditing}
                    onClickSave={onClickSave}
                    onClickCancel={onClickCancel}/>
            </form>
            :
            <div className="problem-name-title">
                <div>
                    {problemTitle}
                </div>
                <FaEdit className="problem-name-editor-btn"
                        onClick={onClickEdit} />
            </div>
        }
        </div>
    </>;
};

export default ProblemTitle;
