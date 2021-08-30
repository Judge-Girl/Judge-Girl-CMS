import Block from "./Block";
import {useState} from "react";
import {useTags} from "../../../usecases/TagUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../commons/TextInputItems";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import TagWithIconList from "../../commons/TagWithIconList";
import {AiOutlinePaperClip} from "react-icons/all";


const SubmittedCodeSpec = () => {
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
        <Block title="Submitted Code Spec"
               id="problem-editor-submitted-code-spec"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <TagWithIconList icon={<AiOutlinePaperClip/>}
                                 style={{color: "rgba(18, 115, 186, 1)"}}
                                 items={tags.map(tag => tag.name)}/>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"} onSubmit={addTag} style={{width: "234px"}}/>
                    <TextInputItems items={tags} removeItem={removeTag}/>
                </>
            }
        </Block>
    </>;
};

export default SubmittedCodeSpec;
