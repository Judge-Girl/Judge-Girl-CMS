import React from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/TitleLine";
import {InputForm, Items} from '../../commons/ProblemEditorPage/ProblemEditorPage';

function TagList() {
    const {tags, addTags, removeTag} = useTags();

    return (
        <div>
            <SubtitleLine title={"Tags"} />
            <InputForm placeholder={"Add New Tags"} onSubmit={addTags}  />
            <Items items={tags} removeItems={removeTag} />
        </div>
    )
}

export default TagList
