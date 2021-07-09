import React, {useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {InlineInputBox} from "./InlineInputBox";

function ResourceSpec({currentProblem, handleResourceSpecCPU, handleResourceSpecGPU}) {
    const [cpu, setCpu] = useState(currentProblem.languageEnvs[0].resourceSpec.cpu)
    const [gpu, setGpu] = useState(currentProblem.languageEnvs[0].resourceSpec.gpu)

    const handleChangeCPU = (e) => {
        handleResourceSpecCPU(e.target.value)
        setCpu(e.target.value)
    }

    const handleChangeGPU = (e) => {
        handleResourceSpecGPU(e.target.value)
        setGpu(e.target.value)
    }

    // console.log(currentProblem)
    return (
        <div>
            <SubtitleLine title={"Resource Spec"}/>
            <InlineInputBox title="CPU" value={cpu} onChange={handleChangeCPU}/>
            <InlineInputBox title="GPU" value={gpu} onChange={handleChangeGPU}/>
        </div>

    )
}

export default ResourceSpec;
