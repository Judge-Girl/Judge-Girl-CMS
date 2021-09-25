import Block from "./Block";
import "./ActionItem.scss";
import React, {useEffect, useState} from "react";
import {Divider} from "./Divider";
import {useHistory, useParams} from "react-router-dom";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";
import {DeleteConfirmationModal} from "../../../commons/modals/DeleteConfirmationModal";

const ActionItem = ({title, description, buttonName, onClick}) => {
    return <div className="action-item">
        <p className="action-title">{title}</p>
        <p className="action-description">{description}</p>
        <button className="action-btn" onClick={onClick}>{buttonName}</button>
    </div>
}

const Actions = () => {
    const history = useHistory();
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {markProblemsDirty} = useProblemEditorContext();
    const [archived, setArchived] = useState(false);
    const [showDeleteProblemModal, setShowDeleteProblemModal] = useState(false);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(p => {
                    setProblem(p);
                    setArchived(p.archived)
                });
        }
    }, [problem, problemId]);

    const archiveProblem = () => {
        problemService.archiveOrDeleteProblem(problemId)
            .then(() => {
                console.log(`Problem ${problemId} has been archived`);
                markProblemsDirty();
                setArchived(true);
            })
    }

    const restoreProblem = () => {
        problemService.restoreProblem(problemId)
            .then(() => {
                console.log(`Problem ${problemId} has been restored`);
                markProblemsDirty();
                setArchived(false);
            })
    }

    const deleteProblem = () => {
        problemService.archiveOrDeleteProblem(problemId)
            .then(() => {
                console.log(`Problem ${problemId} has been deleted`);
                markProblemsDirty();
                history.push("/problems");
            })
    }

    return <>
        <Block title="Actions" id="problem-editor-actions">
            {archived ?
                <>
                    <ActionItem title="Restore"
                                description="*You can see this problem on the problem list after restore this problem."
                                buttonName="Restore This Problem"
                                onClick={restoreProblem}/>

                    <Divider/>
                    <ActionItem title="Delete"
                                description="*Once you delete a problem, there is no going back. Please be certain."
                                buttonName="Delete This Problem"
                                onClick={() => setShowDeleteProblemModal(true)}/>
                </>
                :
                <ActionItem title="Archive"
                            description={<>
                                *Archive action will remove this problem from the problem list but it hasn’t been deleted.<br/>
                                You can find archive problems in the <i>Archived Problem list</i>.
                            </>}
                            buttonName="Archive This Problem"
                            onClick={archiveProblem}/>
            }
        </Block>

        <DeleteConfirmationModal title="Delete the Problem"
                                 data={[
                                     {
                                         title: "Problem Title",
                                         value: problem?.title
                                     }
                                 ]}
                                 show={showDeleteProblemModal}
                                 onClose={() => setShowDeleteProblemModal(false)}
                                 onSubmit={deleteProblem}/>
    </>
};

export default Actions;
