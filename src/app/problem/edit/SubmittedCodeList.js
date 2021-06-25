import React, {useEffect} from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function SubmittedCodeList({problemAttributes}) {
    const {tags, setTags, addTags, removeTag} = useTags();

    useEffect(() => {
        const oldFiles = [];
        for (let i = 0; i < problemAttributes.languageEnvs[0].submittedCodeSpecs[0].fileName.length; i++) {
            oldFiles.push({id: 1000+i, text: problemAttributes.languageEnvs[0].submittedCodeSpecs[0].fileName})
        }
        setTags(oldFiles);
    }, [problemAttributes, setTags])

    return (
        <div>
            <SubtitleLine title={"Submitted Code Spec"}/>
            <TextInputForm placeholder={"Add Submitted Code File Name"} onSubmit={addTags}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </div>
    )
}

export default SubmittedCodeList
