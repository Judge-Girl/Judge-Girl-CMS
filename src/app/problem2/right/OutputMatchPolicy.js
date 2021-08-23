import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "../../problem/edit/TextInputItems";
import TagWithIconList from "../commons/TagWithIconList";
import {AiOutlinePaperClip, RiRulerLine} from "react-icons/all";

const OutputMatchPolicy = () => {
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
        <Block title="Output Match Policy"
               id="problem-editor-output-match-policy"
               titleButton={
                   <ESCButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                    <TagWithIconList icon={<RiRulerLine/>} style={{color: "rgba(18, 115, 186, 1)"}}
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

export default OutputMatchPolicy;
