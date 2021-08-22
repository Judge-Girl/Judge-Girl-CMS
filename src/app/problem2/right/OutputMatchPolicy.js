import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";
import {useTags} from "../../usecases/TagUseCase";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "../../problem/edit/TextInputItems";

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
                </>
                :
                <>
                </>
            }
            <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags} style={{width: "234px"}}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </Block>
    </>;
};

export default OutputMatchPolicy;
