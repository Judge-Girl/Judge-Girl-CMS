import React, {useState} from 'react';
import SubmittedCodeForm from './SubmittedCodeForm';
import SubmittedCode from './SubmittedCode';
import '../ProblemEditor.css';

function SubmittedCodeList() {
    const [tags, setTags] = useState([]);

    const addTags = tag => {
        // avoid empty, illegal, or
        // repeated input (not finished yet)
        if (!tag.text || /^\s*$/.test(tag.text)) {
            return
        }

        const newTags = [tag, ...tags];

        setTags(newTags);
        console.log(...tags);
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