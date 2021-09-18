import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useTextInputContent} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../../commons/TextInputForm/TextInputItems";
import TextInputItemsPreview from "../../../commons/TextInputForm/TextInputItemsPreview.js";
import {GoTriangleDown, RiRulerLine} from "react-icons/all";

const OutputMatchPolicy = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {textInputContents, addTextInputContent, removeTextInputContent} = useTextInputContent();

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
                <TextInputItemsPreview icon={<RiRulerLine/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                       items={textInputContents.map(content => content.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add Match Policy"}
                                    buttonTitle={<GoTriangleDown/>}
                                    onSubmit={addTextInputContent} style={{width: "234px"}}/>
                    <TextInputItems items={textInputContents} removeItem={removeTextInputContent}/>
                </>
            }
        </Block>
    </>;
};

export default OutputMatchPolicy;
