import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const OutputMatchPolicy = () => {
    return <>
        <Block title="Output Match Policy"
               id="problem-editor-output-match-policy"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2" />
               }>
            All match
        </Block>
    </>;
}

export default OutputMatchPolicy;
