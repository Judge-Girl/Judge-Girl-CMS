import React, {useState} from 'react';
import TagsForm from "./TagsForm";
import Tags from "./Tags";
import '../ProblemEditor.css';
import {isLegalText} from "../utils";

function TagList() {
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
            <h2>Tags</h2>
            <hr />
            <TagsForm onSubmit={addTags} />
            <Tags tags={tags} removeTag={removeTag} />
        </div>
    )
}

export default TagList