import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";

const CompilationScript = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [script, setScript] = useState("");

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
    }

    const onClickCancel = () => {
        setIsEditing(false);
    }

    return <>
        <Block title="Compilation Script"
               id="problem-editor-compilation-script"
               titleButton={
               <EditSaveCancelButton
                   isEditing={isEditing}
                   onClickEdit={onClickEdit}
                   onClickSave={onClickSave}
                   onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                    <div style={{color: "rgba(18, 115, 186, 1)"}}>{script}</div>
                </>
                :
                <>
                    {/* TODO: some attributes should be moved to .scss. */}
                    <textarea
                        cols="40" rows="5"
                        className="compile-script-text-area" style={{resize: "vertical"}}
                        placeholder="gcc a.out -o main.c"
                        value={script}
                        onChange={e => setScript(e.target.value)}
                    />
                    <button className="button compile-script-button">Auto Generate</button>
                </>
            }
        </Block>
    </>;
};

export default CompilationScript;
