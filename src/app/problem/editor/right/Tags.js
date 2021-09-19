import Block from "./Block";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useTextItems} from "../../../usecases/TextItemUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {FixedTextInputField} from "../../../commons/TextInputForm/FixedTextInputField";
import {useState} from "react";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems.js";
import {BsTag} from "react-icons/all";


const Tags = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [textItemsBackUp, setTextItemsBackUp] = useState(undefined);
    const {textItems, setTextItems, addTextItem, removeTextItem} = useTextItems();

    const onClickEdit = () => {
        setTextItemsBackUp(textItems);
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
        // TODO: API connection, save to DB.
    };

    const onClickCancel = () => {
        setIsEditing(false);
        setTextItems(textItemsBackUp);
    };

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
                <IconTextItems icon={<BsTag size={21}/>} style={{color: "rgba(18, 115, 186, 1)"}}
                               items={textItems.map(content => content.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"} style={{width: "234px"}}
                                    onSubmit={addTextItem}/>
                    <FixedTextInputField items={textItems} removeItem={removeTextItem} iconSize={15}/>
                </>
            }
        </Block>
    </>;
};

export default Tags;
