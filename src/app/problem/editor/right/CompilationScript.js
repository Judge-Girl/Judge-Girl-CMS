import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {EditorButton} from "../../commons/EditorButton";


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
                <div style={{color: "rgba(18, 115, 186, 1)"}}>{script}</div>
                :
                <>
                    {/* TODO: Should be moved to ProblemEditor.scss. */}
                    {/* TODO: Default values should passed by variable. */}
                    <textarea
                        cols="40" rows="7"
                        className="compile-script-text-area" style={{resize: "vertical"}}
                        placeholder="gcc a.out -o main.c" value={script}
                        onChange={e => setScript(e.target.value)}
                    />
                    <EditorButton
                        text="Auto Generate"
                        type="file"
                        buttonColor="rgba(236, 112, 99, 1)"
                        fontSize="16px"
                        fontColor="#fff"
                        width="11em"
                        height="36px"
                        borderRadius="50px"
                        onClick={undefined} />
                </>
            }
        </Block>
    </>;
};

export default CompilationScript;
