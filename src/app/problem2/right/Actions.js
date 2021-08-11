import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const Actions = () => {
    return <>
        <Block title="Actions"
               id="problem-editor-actions"
               titleButton={
                   <EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2" />
               }>
        </Block>
    </>;
}

export default Actions;
