import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const ProvidedCode = () => {
    return <>
        <Block title="Provided Code"
               id="problem-editor-provided-code"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2"
               />}>
            add.c
        </Block>
    </>;
}

export default ProvidedCode;