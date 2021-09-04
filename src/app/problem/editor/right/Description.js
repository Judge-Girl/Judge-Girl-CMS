import Block from "./Block";
import {useState} from "react";
import MarkdownEditorWriteTab from "../../commons/MarkdownEditorWriteTab";
import MarkdownEditorPreviewTab from "../../commons/MarkdownEditorPreviewTab";
import {EditorContext} from "../../commons/MarkdownEditorContext";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import MarkdownEditor from "../../commons/MarkdownEditor";


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
        // TODO: Save markdownText to DB.
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
