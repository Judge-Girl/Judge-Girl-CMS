import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";

const CompilationScript = () => {
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

    return <>
        <Block title="Compilation Script"
               id="problem-editor-compilation-script"
               titleButton={
               <ESCButton
                   isEditing={isEditing}
                   onClickEdit={onClickEdit}
                   onClickSave={onClickSave}
                   onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                </>
                :
                <>
                </>
            }
            <textarea
                cols="40" rows="5"
                className="compile-script-text-area" style={{resize: "vertical"}}
                placeholder="gcc a.out -o main.c"/>
            <button className="button compile-script-button">Auto Generate</button>
        </Block>
    </>;
};

export default CompilationScript;
