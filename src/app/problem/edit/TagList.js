import React, {useEffect} from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function TagList({currentProblem, handleTagsChange}) {
    const {tags, setTags, addTags, removeTag} = useTags();

    useEffect(() => {
        const oldTags = [];
        for (let i = 0; currentProblem && i < currentProblem.tags.length; i++) {
            oldTags.push({id: 1000+i, text: currentProblem.tags[i]})
        }
        setTags(oldTags);
    }, [currentProblem, setTags])

    useEffect(() => {
        const newTags = []
        for (const tag of tags) {
            newTags.push(tag.text)
        }
        handleTagsChange(newTags)
    }, [tags, handleTagsChange])

    return (
        <div>
            <SubtitleLine title={"Tags"}/>
            <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags} style={{width: "234px"}}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </div>
    )
}

export default TagList
