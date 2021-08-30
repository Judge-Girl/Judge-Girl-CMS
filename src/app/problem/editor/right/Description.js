import Block from "./Block";
import {useState} from "react";
import MarkdownEditor from "../../commons/MarkdownEditor";
import MarkdownEditorWriteTab from "../../commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../commons/MarkdownEditorPreviewTab";
import {EditorContext} from "../../commons/MarkdownEditorContext";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";


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
            <EditorContext.Provider value={{draftRawText, setDraftRawText, finalRawText, setFinalRawText}}>
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
