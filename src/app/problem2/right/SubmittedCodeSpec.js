import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const SubmittedCodeSpec = () => {
    return <>
        <Block title="Submitted Code Spec"
               id="problem-editor-submitted-code-spec"
               titleButton={
                   <EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2" />
               }>
            add.c
        </Block>
    </>;
}

export default SubmittedCodeSpec;
