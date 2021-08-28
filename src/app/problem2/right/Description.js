import Block from "./Block";
import {useState} from "react";
import MarkdownEditor from "../commons/MarkdownEditor";
import NewMarkdownEditorWriteTab from "../commons/NewMarkdownEditorWriteTab";
import NewMarkdownEditorPreviewTab from "../commons/NewMarkdownEditorPreviewTab";
import {EditorContext} from "../commons/NewMarkdownEditorContext";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";


const Description = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [draftRawText, setDraftRawText] = useState(undefined);
    const [finalRawText, setFinalRawText] = useState(undefined);

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
        // TODO: call API to save to DB.
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setDraftRawText(undefined);
        setFinalRawText(undefined);
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
            <EditorContext.Provider value={{draftRawText, setDraftRawText,
                finalRawText, setFinalRawText}}>
                {!isEditing?
                    <NewMarkdownEditorPreviewTab/>
                    :
                    <MarkdownEditor
                        tabObjects={[
                            {title: "Write", component: <NewMarkdownEditorWriteTab/>},
                            {title: "Preview", component: <NewMarkdownEditorPreviewTab/>}
                        ]}
                        defaultIndex={1}
                        onEdit={setIsEditing}/>
                }
            </EditorContext.Provider>
        </Block>
    </>;
};

export default Description;
