import Block from "./Block";
import {useEffect, useState} from "react";
import MarkdownEditorWriteTab from "../../commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../commons/MarkdownEditorPreviewTab";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import MarkdownEditor from "../../commons/MarkdownEditor";
import {ACTION_UPDATE_DESCRIPTION, useProblemEditorContext} from "../context";
import {problemService} from "../../../../services/services";
import {useParams} from "react-router";


const ProblemDescription = () => {
    const {problemId} = useParams();
    const {problem, dispatch} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [markdownText, setMarkdownText] = useState(undefined);
    const [markdownTextBackUp, setMarkdownTextBackUp] = useState(undefined);

    useEffect(() => {
        if (problem) {
            if (markdownText === undefined) {
                setMarkdownText(problem.description);
                if (markdownTextBackUp === undefined) {
                    setMarkdownTextBackUp(problem.description);
                }
            }
        }
    }, [problem, markdownText, setMarkdownText, markdownTextBackUp, setMarkdownTextBackUp]);

    const onClickEdit = () => {
        setMarkdownTextBackUp(markdownText);
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
        problemService.updateProblemDescription(problemId, markdownText)
            .then(() => {
                console.log("The problem's description has been modified");
                setMarkdownTextBackUp(markdownText);
                dispatch({type: ACTION_UPDATE_DESCRIPTION, description: markdownText});
            });
    };

    const onClickCancel = () => {
        setIsEditing(false);
        setMarkdownText(markdownTextBackUp);
    };

    return <>
        <Block title="Description"
               id="problem-editor-description"
               titleButton={
                   <EditSaveCancelButton isEditing={isEditing}
                                         onClickEdit={onClickEdit}
                                         onClickSave={onClickSave}
                                         onClickCancel={onClickCancel}/>
               }>
            <MarkdownEditor className="markdown"
                            tags={[
                                {title: "Write", component: <MarkdownEditorWriteTab initialMarkdownText={markdownText}
                                                                                    onMarkdownTextChange={setMarkdownText}/>},
                                {title: "Preview", component: <MarkdownEditorPreviewTab markdownText={markdownText}/>},
                            ]}
                            defaultTabIndex={1}
                            isEditing={isEditing}/>
        </Block>
    </>;
};

export default ProblemDescription;
