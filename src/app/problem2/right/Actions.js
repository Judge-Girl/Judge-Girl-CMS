import Block from "./Block";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";
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

    return <>
        <Block title="Actions"
               id="problem-editor-actions"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
        </Block>
    </>;
};

export default Actions;
