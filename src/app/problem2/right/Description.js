import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";
import {useState} from "react";
import NewMarkdownEditor from "../commons/NewMarkdownEditor";
import NewMarkdownEditorWriteTab from "../commons/NewMarkdownEditorWriteTab";
import NewMarkdownEditorPreviewTab from "../commons/NewMarkdownEditorPreviewTab";
import {EditorContext} from "../commons/NewMarkdownEditorContext";


const Description = () => {
    const [onEdit, setOnEdit] = useState(false);
    const [draftRawText, setDraftRawText] = useState(undefined);
    const [finalRawText, setFinalRawText] = useState(undefined);

    const onEditButtonClicked = () => {
        setOnEdit(true);
    }

    const onSaveButtonClicked = () => {
        setOnEdit(false);
        // TODO: call API to save to DB.
    }

    const onCancelButtonClicked = () => {
        setOnEdit(false);
        setDraftRawText(undefined);
        setFinalRawText(undefined);
    }

    return <>
        <Block title="Description"
               id="problem-editor-description"
               titleButton={!onEdit?
                   <EditorButton text="Edit"
                                 width="70px"
                                 height="36px"
                                 borderRadius="50px"
                                 fontColor="rgba(124,124,124,1)"
                                 borderColor="#D2D2D2"
                                 onClick={onEditButtonClicked}/>
                   :
                   <div style={{display: "flex", flexDirection: "row"}}>
                       <EditorButton text="Save"
                                     buttonColor="rgba(88, 214, 141, 1)"
                                     fontColor="#FFF"
                                     width="70px"
                                     height="36px"
                                     borderRadius="50px"
                                     onClick={onSaveButtonClicked}/>
                       <EditorButton text="Cancel"
                                     fontColor="rgba(124,124,124,1)"
                                     width="87px"
                                     height="36px"
                                     borderRadius="50px"
                                     marginLeft="10px"
                                     onClick={onCancelButtonClicked}/>
                   </div>
               }>
            <EditorContext.Provider value={{draftRawText, setDraftRawText,
                finalRawText, setFinalRawText}}>
                <NewMarkdownEditor
                    tabObjects={[
                        {title: "Write", component: <NewMarkdownEditorWriteTab/>},
                        {title: "Preview", component: <NewMarkdownEditorPreviewTab/>}
                    ]}
                    defaultIndex={1}
                    onEdit={onEdit}/>
            </EditorContext.Provider>
            <br/>
        </Block>
    </>;
}

export default Description;
