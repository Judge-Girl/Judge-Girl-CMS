import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {useTags} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../commons/TextInputItems";
import TagWithIconList from "../../commons/TagWithIconList";
import {GoTriangleDown, RiRulerLine} from "react-icons/all";

const OutputMatchPolicy = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {tags, addTag, removeTag} = useTags();

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
                <>
                    <TagWithIconList icon={<RiRulerLine/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                     items={tags.map(tag => tag.name)}/>
                </>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"}
                                    buttonTitle={<GoTriangleDown/>}
                                    onSubmit={addTag} style={{width: "234px"}}/>
                    <TextInputItems items={tags} removeItem={removeTag}/>
                </>
            }
        </Block>
    </>;
};

export default OutputMatchPolicy;
