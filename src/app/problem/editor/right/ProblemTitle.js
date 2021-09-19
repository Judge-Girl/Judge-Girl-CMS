import {useProblemEditorContext} from "../ProblemEditorContext";
import {useEffect, useState} from "react";
import {problemService} from "../../../../services/services";
import {FaEdit} from "react-icons/all";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useParams} from "react-router-dom";


const ProblemTitle = () => {
    const {problemId} = useParams();
    const {markProblemsDirty} = useProblemEditorContext();
    const [problemTitle, setProblemTitle] = useState(undefined);
    const [problemTitleBackUp, setProblemTitleBackUp] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (!problemTitle) {
            problemService.getProblemById(problemId)
                .then(problem => setProblemTitle(problem.title));
        }
    }, [problemTitle, problemId, setProblemTitle]);


    const onClickEdit = () => {
        setIsEditing(true);
        setProblemTitleBackUp(problemTitle);
    };

    const onClickSave = () => {
        if (problemTitle.length === 0) {
            return;
        }

        problemService.updateProblemTitle(problemId, problemTitle)
            .then(() => {
                console.log("The problem's title has been modified");
                markProblemsDirty();
            });
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setProblemTitle(problemTitleBackUp);
        setIsEditing(false);
    };

    if (!problemTitle)
        return "";

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
