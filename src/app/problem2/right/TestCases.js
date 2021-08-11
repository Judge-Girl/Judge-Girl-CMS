import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";

const TestCases = () => {
    return <>
        <Block title="Test Cases"
               id="problem-editor-testcases"
               titleButton={<EditorButton text="Edit"
                                          width="70px"
                                          height="36px"
                                          borderRadius="50px"
                                          fontColor="rgba(124,124,124,1)"
                                          borderColor="#D2D2D2"
               />}>
            123
        </Block>
    </>;
}

export default TestCases;
