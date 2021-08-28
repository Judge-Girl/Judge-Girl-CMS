import {useProblemEditorContext} from "../ProblemEditorContext";
import {useState} from "react";
import {problemService} from "../../../services/services";
import {FaEdit} from "react-icons/all";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";


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
        <div className="problem-title">
        {!isEditing?
            <div className="not-on-edit">
                <div>{problemTitle}</div><FaEdit className="edit-icon" onClick={onClickEdit} />
            </div>
            :
            <form className="on-edit">
                <input className="input-field"
                       type="text"
                       required value={problemTitle}
                       onChange={e => setProblemTitle(e.target.value)}/>
                <div style={{width: "20px"}}/>
                <EditSaveCancelButton
                    isEditing={isEditing}
                    onClickSave={onClickSave}
                    onClickCancel={onClickCancel}/>
            </form>
        }
        </div>
    </>;
};

export default ProblemTitle;
