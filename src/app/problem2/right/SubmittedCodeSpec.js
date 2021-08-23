import Block from "./Block";
import {useState} from "react";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "../../problem/edit/TextInputItems";
import {ESCButton} from "../commons/ESCButton";
import TagWithIconList from "../commons/TagWithIconList";
import {AiOutlinePaperClip, BsTag} from "react-icons/all";

const SubmittedCodeSpec = () => {
    const [isEditing, setIsEditing] = useState(false);
    const {tags, addTags, removeTag} = useTags();

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
                   <ESCButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                    <TagWithIconList icon={<AiOutlinePaperClip/>} style={{color: "rgba(18, 115, 186, 1)"}}
                                     items={tags.map(tag => tag.text)}/>
                </>
                :
                <>
                    <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags} style={{width: "234px"}}/>
                    <TextInputItems items={tags} removeItems={removeTag}/>
                </>
            }
        </Block>
    </>;
};

export default SubmittedCodeSpec;
