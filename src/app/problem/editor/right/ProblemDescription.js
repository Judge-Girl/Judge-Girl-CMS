import Block from "./Block";
import {useEffect, useState} from "react";
import MarkdownEditorWriteTab from "../../commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../commons/MarkdownEditorPreviewTab";
import {EditorContext} from "../../commons/MarkdownEditorContext";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import MarkdownEditor from "../../commons/MarkdownEditor";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";
import {useParams} from "react-router";


const ProblemDescription = () => {
    const {problemId} = useParams();
    const {markProblemsDirty} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [markdownText, setMarkdownText] = useState(undefined);
    const [markdownTextBackUp, setMarkdownTextBackUp] = useState(undefined);

    useEffect(() => {
        if (!markdownText) {
            problemService.getProblemById(problemId)
                .then(problem => setMarkdownText(problem.description));
        }
    }, [markdownText, problemId, setMarkdownText]);

    const onClickEdit = () => {
        setMarkdownTextBackUp(markdownText);
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
        problemService.updateProblemDescription(problemId, markdownText)
            .then(() => {
                console.log("The problem's description has been modified");
                markProblemsDirty();
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
            <EditorContext.Provider value={{markdownText, setMarkdownText}}>
                <MarkdownEditor className="markdown"
                                tabObjects={[
                                    {title: "Write", component: <MarkdownEditorWriteTab/>},
                                    {title: "Preview", component: <MarkdownEditorPreviewTab/>},
                                ]}
                                defaultTabIndex={1}
                                isEditing={isEditing}/>
            </EditorContext.Provider>
        </Block>
    </>;
};

export default ProblemDescription;
