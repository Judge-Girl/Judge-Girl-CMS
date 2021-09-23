import Block from "./Block";
import {useEffect, useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {FiCpu} from "react-icons/all";
import {problemService} from "../../../../services/services";
import {useParams} from "react-router-dom";
import {LanguageEnv} from "../../Model";


const ResourceSpec = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const [languageEnv, setLanguageEnv] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [cpuCount, setCpuCount] = useState(0);
    const [gpuCount, setGpuCount] = useState(0);
    const [cpuCountBackUp, setCpuCountBackUp] = useState(undefined);
    const [gpuCountBackUp, setGpuCountBackUp] = useState(undefined);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(p => {
                    setProblem(p);
                    setLanguageEnv(new LanguageEnv(p.languageEnvs[0]));
                });
        }
        if (languageEnv) {
            setCpuCount(languageEnv.getResourceSpecCpu());
            setGpuCount(languageEnv.getResourceSpecGpu());
        }
    }, [languageEnv, problem, problemId, setCpuCount, setGpuCount]);

    const onClickEdit = () => {
        setIsEditing(true);
        setCpuCountBackUp(cpuCount);
        setGpuCountBackUp(gpuCount);
    }

    const onClickSave = () => {
        setIsEditing(false);
        languageEnv.updateResourceSpecCpu(cpuCount);
        languageEnv.updateResourceSpecGpu(gpuCount);
        problemService.updateLanguageEnv(problemId, languageEnv)
            .then(() => {
                console.log("The problem's ResourceSpecCpu and ResourceSpeGpu have been updated");
            });
    }

    const onClickCancel = () => {
        setIsEditing(false);
        setCpuCount(cpuCountBackUp);
        setGpuCount(gpuCountBackUp);
    }
    return <>
        <Block title="Resource Spec"
               id="problem-editor-resource-spec"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {/* TODO: Refactor to a new component. */}
            {/* TODO: Move css properties to ProblemEditor.scss. */}
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", height: "1.5em"}}>
                <FiCpu/>
                <span style={{width: "35px", marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>CPU</span>
                {!isEditing ?
                    <span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{cpuCount}</span>
                    :
                    <input type="text" className="input-box" value={cpuCount}
                           onChange={e => setCpuCount(e.target.value)}/>
                }
            </div>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center", height: "1.5em"}}>
                <FiCpu/>
                <span style={{width: "35px", marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>GPU</span>
                {!isEditing ?
                    <span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{gpuCount}</span>
                    :
                    <input type="text" className="input-box" value={gpuCount}
                           onChange={e => setGpuCount(e.target.value)}/>
                }
            </div>
        </Block>
    </>;
};

export default ResourceSpec;
