import Block from "./Block";
import {useState} from "react";
import MarkdownEditorWriteTab from "../../commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../commons/MarkdownEditorPreviewTab";
import {EditorContext} from "../../commons/MarkdownEditorContext";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import MarkdownEditor from "../../commons/MarkdownEditor";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";


const Description = () => {
    const {currentProblem, fetchProblems} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [markdownText, setMarkdownText] = useState(currentProblem.description);
    const [markdownTextBackUp, setMarkdownTextBackUp] = useState(undefined);

    const onClickEdit = () => {
        setMarkdownTextBackUp(markdownText);
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
        problemService.modifyProblemDescription(currentProblem.id, markdownText)
            .then(() => {
                console.log("The problem's description has been modified");
                fetchProblems();
            });
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setMarkdownText(markdownTextBackUp);
    }

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

export default Description;
