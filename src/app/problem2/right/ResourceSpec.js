import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";

const ResourceSpec = () => {
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
        <Block title="Resource Spec"
               id="problem-editor-resource-spec"
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
            CPU: 1<br/>
            GPU: 1
        </Block>
    </>;
};

export default ResourceSpec;
