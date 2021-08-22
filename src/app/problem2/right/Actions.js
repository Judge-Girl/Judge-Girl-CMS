import Block from "./Block";
import {ESCButton} from "../commons/ESCButton";
import {useState} from "react";

const Actions = () => {
    const [isEditing, setIsEditing] = useState(false);

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
    }

    const onClickCancel = () => {
        setIsEditing(false);
    }

    const saved = () => {
        // {isProblemArchived ? <RestoreAndDeleteProblemButtons/> : <ArchiveProblemButton/>}

        return <>
            <div style={{width: "950px"}}>
                <section>
                    {/*
                        <MarkdownEditor text={problemDescription}
                                        onTextChanged={setProblemDescription}
                                        editingState={editingState}
                                        editorButtons={editingState ?
                                            <HandleDescriptionButtons/> : <EditDescriptionButton/>
                                        }
                                        style={{backgroundColor: "var(--backgroundDim)"}}/>
                    */}
                </section>
            </div>
        </>
    }

    return <>
        <Block title="Actions"
               id="problem-editor-actions"
               titleButton={
                   <ESCButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
        </Block>
    </>;
};

export default Actions;
