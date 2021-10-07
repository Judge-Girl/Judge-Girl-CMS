import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useTextItems} from "../../../usecases/TextItemUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {FixedTextInputField} from "../../../commons/TextInputForm/FixedTextInputField";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems.js";
import {GoTriangleDown, RiRulerLine} from "react-icons/all";

const OutputMatchPolicy = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {textItems, addTextItem, removeTextItem} = useTextItems();
    // TODO
    return "";

    const onClickEdit = () => {
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
    };

    const onClickCancel = () => {
        setIsEditing(false);
    };

    return <>
        <Block title="Output Match Policy"
               id="problem-editor-output-match-policy"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <IconTextItems icon={<RiRulerLine/>}
                               items={textItems.map(item => item.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add Match Policy"}
                                    buttonTitle={<GoTriangleDown/>}
                                    onSubmit={addTextItem} style={{width: "234px"}}/>
                    <FixedTextInputField items={textItems} removeItem={removeTextItem} iconSize={15}/>
                </>
            }
        </Block>
    </>;
};

export default OutputMatchPolicy;
