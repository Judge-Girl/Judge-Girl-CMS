import React, {useState} from 'react';
import TagsForm from "./TagsForm";
import Tags from "./Tags";
import '../ProblemEditor.css';

function TagList() {
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
            <h2>Tags</h2>
            <hr />
            <TagsForm onSubmit={addTags} />
            <Tags tags={tags} removeTag={removeTag} />
        </div>
    )
}

export default TagList