import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";
import React from "react";

const ResourceSpec = () => {
    return <>
        <Block title="Resource Spec"
               id="problem-editor-resource-spec"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2" />
               }>
            CPU: 1<br/>
            GPU: 1
        </Block>
    </>;
}

export default ResourceSpec;
