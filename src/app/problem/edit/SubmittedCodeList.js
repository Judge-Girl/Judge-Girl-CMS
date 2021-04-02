import React from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function SubmittedCodeList() {
    const {tags, addTags, removeTag} = useTags();
    return (
        <div>
            <SubtitleLine title={"Submitted Code Spec"} />
            <TextInputForm placeholder={"Add Submitted Code File Name"} onSubmit={addTags} />
            <TextInputItems items={tags} removeItems={removeTag} />
        </div>
    )
}

export default SubmittedCodeList
