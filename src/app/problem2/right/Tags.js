import Block from "./Block";
import {EditSaveCancelButton} from "../commons/EditSaveCancelButton";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputField} from "../../commons/TextInputForm/TextInputField";
import {TextInputItems} from "../../problem/edit/TextInputItems";
import {useState} from "react";
import TagWithIconList from "../commons/TagWithIconList";
import {BsTag} from "react-icons/all";


const Tags = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [tagsBackUp, setTagsBackUp] = useState(undefined);
    const {tags, setTags, addTag, removeTag} = useTags();

    const onClickEdit = () => {
        setTagsBackUp(tags);
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
        // TODO: API connection, save to DB.
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setTags(tagsBackUp);
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
        {!isEditing?
            <TagWithIconList icon={<BsTag size={21}/>} style={{color: "rgba(18, 115, 186, 1)"}}
                             items={tags.map(tag => tag.name)}/>
            :
            <>
                <TextInputField placeholder={"Add New Tags"} style={{width: "234px"}}
                                onSubmit={addTag}/>
                <TextInputItems items={tags} removeItem={removeTag}/>
            </>
        }
        </Block>
    </>;
};

export default Tags;