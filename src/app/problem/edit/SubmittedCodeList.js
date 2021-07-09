import React, {useEffect} from 'react';
import '../ProblemEditor.css';
import {useTags} from "../../usecases/TagUseCase";
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {TextInputForm} from "../../commons/TextInputForm/TextInputForm";
import {TextInputItems} from "./TextInputItems";

function SubmittedCodeList({currentProblem, handleSubmittedCodesChange}) {
    const {tags, setTags, addTags, removeTag} = useTags();

    useEffect(() => {
        const oldFiles = [];
        for (let i = 0; i < currentProblem.languageEnvs[0].submittedCodeSpecs.length; i++) {
            oldFiles.push({id: 1000+i, text: currentProblem.languageEnvs[0].submittedCodeSpecs[i].fileName})
        }
        setTags(oldFiles);
    }, [currentProblem, setTags])

    useEffect(() => {
        const newTags = []
        for (const tag of tags) {
            const fileName = tag.text
            newTags.push({
                "format": "C",
                "fileName": fileName
            })
        }
        handleSubmittedCodesChange(newTags)
    }, [tags, handleSubmittedCodesChange])

    return (
        <div>
            <SubtitleLine title={"Submitted Code Spec"}/>
            <TextInputForm placeholder={"Add Submitted Code File Name"} onSubmit={addTags}/>
            <TextInputItems items={tags} removeItems={removeTag}/>
        </div>
    )
}

export default SubmittedCodeList
