import React from 'react';
import TagsForm from "./TagsForm";
import Tags from "./Tags";
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";

function TagList() {
    const {tags, addTags, removeTag} = useTags();

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
