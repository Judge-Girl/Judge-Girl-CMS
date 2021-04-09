import React from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function TagList() {
    const {tags, addTags, removeTag} = useTags();

    return (
        <div>
            <SubtitleLine title={"Tags"}/>
            <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </div>
    )
}

export default TagList
