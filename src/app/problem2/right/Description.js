import Block from "./Block";
import {useState} from "react";
import MarkdownEditor from "../commons/MarkdownEditor";
import MarkdownEditorWriteTab from "../commons/NewMarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../commons/NewMarkdownEditorPreviewTab";
import {EditorContext} from "../commons/NewMarkdownEditorContext";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";


const Description = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [markdownText, setMarkdownText] = useState(undefined);
    const [markdownTextBackUp, setMarkdownTextBackUp] = useState(undefined);

    const onClickEdit = () => {
        setMarkdownTextBackUp(markdownText);
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
        // TODO: call API to save to DB.
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setMarkdownText(markdownTextBackUp);
    }

    return <>
        <Block title="Description"
               id="problem-editor-description"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            <EditorContext.Provider value={{markdownText, setMarkdownText, markdownTextBackUp, setMarkdownTextBackUp}}>
            {!isEditing?
                <MarkdownEditorPreviewTab/>
                :
                <MarkdownEditor
                    tabObjects={[
                        {title: "Write", component: <MarkdownEditorWriteTab/>},
                        {title: "Preview", component: <MarkdownEditorPreviewTab/>}
                    ]}
                    defaultIndex={1}
                    isEditing={setIsEditing}/>
            }
            </EditorContext.Provider>
        </Block>
    </>;
};

export default Description;
