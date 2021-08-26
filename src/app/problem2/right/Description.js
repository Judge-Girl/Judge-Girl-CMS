import Block from "./Block";
import {useState} from "react";
import NewMarkdownEditor from "../commons/NewMarkdownEditor";
import NewMarkdownEditorWriteTab from "../commons/NewMarkdownEditorWriteTab";
import NewMarkdownEditorPreviewTab from "../commons/NewMarkdownEditorPreviewTab";
import {EditorContext} from "../commons/NewMarkdownEditorContext";
import {ESCButton} from "../commons/ESCButton";


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
                   <ESCButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            <EditorContext.Provider value={{markdownText, setMarkdownText, markdownTextBackUp, setMarkdownTextBackUp}}>
            {!isEditing?
                <NewMarkdownEditorPreviewTab/>
                :
                <NewMarkdownEditor
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
