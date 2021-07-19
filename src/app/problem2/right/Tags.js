import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const Tags = () => {
    return <>
        <Block title="Tags"
               id="problem-editor-tags"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2" />
               }>
            123 <br/>
            1234
        </Block>
    </>;
}

export default Tags;