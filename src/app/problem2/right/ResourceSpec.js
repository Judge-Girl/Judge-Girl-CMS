import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";
import {InlineInputBox, InputBox} from "../../problem/edit/InlineInputBox";
import {FiCpu} from "react-icons/all";

const ResourceSpec = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [cpuCount, setCpuCount] = useState(1);
    const [gpuCount, setGpuCount] = useState(1);

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
    }

    const onClickCancel = () => {
        setIsEditing(false);
    }
    return <>
        <Block title="Resource Spec"
               id="problem-editor-resource-spec"
               titleButton={
               <ESCButton
                   isEditing={isEditing}
                   onClickEdit={onClickEdit}
                   onClickSave={onClickSave}
                   onClickCancel={onClickCancel}/>
               }>
            {/* TODO: Refactor to a new component. */}
            <div style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                height: "1.5em"
            }}>
                <FiCpu/><span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{"CPU"}</span>
                {!isEditing?
                    <span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{cpuCount}</span>
                    :
                    <input type="text" className="input-box" value={cpuCount} onChange={e => setCpuCount(e.target.value)} />
                }
            </div>
            <div style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                height: "1.5em"
            }}>
                <FiCpu/><span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{"GPU"}</span>
                {!isEditing?
                    <span style={{marginLeft: "5px", color: "rgba(18, 115, 186, 1)"}}>{gpuCount}</span>
                    :
                    <input type="text" className="input-box" value={gpuCount} onChange={e => setGpuCount(e.target.value)}/>
                }
            </div>
        </Block>
    </>;
};

export default ResourceSpec;
