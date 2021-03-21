import React from 'react';
import SubmittedCodeForm from './SubmittedCodeForm';
import SubmittedCode from './SubmittedCode';
import '../ProblemEditor.module.css';
import {useTags} from "../../usecases/TagUseCase";

function SubmittedCodeList() {
    const {tags, addTags, removeTag} = useTags();
    return (
        <div>
            <h2>Submitted Code Spec</h2>
            <hr/>
            <SubmittedCodeForm onSubmit={addTags}/>
            <SubmittedCode tags={tags} removeTag={removeTag}/>
        </div>
    )
}

export default SubmittedCodeList
