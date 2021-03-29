import React from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {InputForm, Items} from "../../commons/ProblemEditorPage/ProblemEditorPage";

function SubmittedCodeList() {
    const {tags, addTags, removeTag} = useTags();
    return (
        <div>
            <SubtitleLine title={"Submitted Code Spec"} />
            <InputForm placeholder={"Add Submitted Code File Name"} onSubmit={addTags} />
            <Items items={tags} removeItems={removeTag} />
        </div>
    )
}

export default SubmittedCodeList
