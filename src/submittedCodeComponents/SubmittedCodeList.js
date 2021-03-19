import React, {useState} from 'react';
import SubmittedCodeForm from './SubmittedCodeForm';
import SubmittedCode from './SubmittedCode';
import '../ProblemEditor.css';
import {isLegalText} from "../utils";

function SubmittedCodeList() {
    const [tags, setTags] = useState([]);

    const addTags = tag => {
        if (isLegalText(tag.text, tags)) {
            return;
        }

        const newTags = [tag, ...tags];

        setTags(newTags);
    }

    const removeTag = id => {
        const removeAttr = [...tags].filter(tag => tag.id !== id);
        setTags(removeAttr);
    }
    return (
        <div>
            <h2>Submitted Code Spec</h2>
            <hr />
            <SubmittedCodeForm onSubmit={addTags} />
            <SubmittedCode tags={tags} removeTag={removeTag} />
        </div>
    )
}

export default SubmittedCodeList