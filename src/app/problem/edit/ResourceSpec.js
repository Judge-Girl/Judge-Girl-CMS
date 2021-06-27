import React, {useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {InlineInputBox} from "./InlineInputBox";

function ResourceSpec({currentProblem}) {
    const [cpu, setCpu] = useState(currentProblem.languageEnvs[0].resourceSpec.cpu)
    const [gpu, setGpu] = useState(currentProblem.languageEnvs[0].resourceSpec.gpu)

    return (
        <div>
            <SubtitleLine title={"Resource Spec"}/>
            <InlineInputBox title="CPU" value={cpu} onChange={(e) => {setCpu(e.target.value)}}/>
            <InlineInputBox title="GPU" value={gpu} onChange={(e) => {setGpu(e.target.value)}}/>
        </div>

    )
}

export default ResourceSpec;
