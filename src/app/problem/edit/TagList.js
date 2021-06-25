import React, {useEffect} from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function TagList({problemAttributes}) {
    const {tags, setTags, addTags, removeTag} = useTags();

    useEffect(() => {
        const oldTags = [];
        for (let i = 0; problemAttributes && i < problemAttributes.tags.length; i++) {
            oldTags.push({id: 1000+i, text: problemAttributes.tags[i]})
        }
        setTags(oldTags);
    }, [problemAttributes, setTags])

    return (
        <div>
            <SubtitleLine title={"Tags"}/>
            <TextInputForm placeholder={"Add New Tags"} onSubmit={addTags} style={{width: "234px"}}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </div>
    )
}

export default TagList
