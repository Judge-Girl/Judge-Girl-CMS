import Block from "./Block";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useTextInputContent} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../../commons/TextInputForm/TextInputItems";
import {useState} from "react";
import TextInputItemsPreview from "../../../commons/TextInputForm/TextInputItemsPreview.js";
import {BsTag} from "react-icons/all";


const Tags = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [textInputContentsBackUp, setTextInputContentsBackUp] = useState(undefined);
    const {textInputContents, setTextInputContents, addTextInputContent, removeTextInputContent} = useTextInputContent();

    const onClickEdit = () => {
        setTextInputContentsBackUp(textInputContents);
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
        // TODO: API connection, save to DB.
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setTextInputContents(textInputContentsBackUp);
    }

    return <>
        <Block title="Tags"
               id="problem-editor-tags"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing ?
                <TextInputItemsPreview icon={<BsTag size={21}/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                       items={textInputContents.map(content => content.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"} style={{width: "234px"}}
                                    onSubmit={addTextInputContent}/>
                    <TextInputItems items={textInputContents} removeItem={removeTextInputContent}/>
                </>
            }
        </Block>
    </>;
};

export default Tags;
