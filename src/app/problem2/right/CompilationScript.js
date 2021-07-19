import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const CompilationScript = () => {
    return <>
        <Block title="Compilation Script"
               id="problem-editor-compilation-script"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2"/>
               }>
            gcc a.out -o main.c
        </Block>
    </>;
}

export default CompilationScript;
