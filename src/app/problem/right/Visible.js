import {EditorButton} from "../../problem-old/edit/EditorButton";
import Block from "./Block";
import {useState} from "react";


// TODO: This feature has low priority. Please see the related issue#180.
const Visible = () => {
    const [isOnClicked, setIsOnClicked] = useState(false);

    return <>
        <Block title="Visible"
               id="problem-editor-visible"
               titleButton={
                   <div style={{display: "flex", flexDirection: "row"}}>
                       {/* TODO: Should be refactored into a component. */}
                       <EditorButton text="ON"
                                     buttonColor={isOnClicked? "rgba(51, 155, 231, 1)": null}
                                     fontColor={isOnClicked? "#FFF": "rgba(124,124,124,1)"}
                                     width="61px"
                                     height="36px"
                                     borderRadius="50px 0 0 50px"
                                     marginRight="-2px"
                                     onClick={() => setIsOnClicked(true)}
                       />
                       <EditorButton text="OFF"
                                     buttonColor={isOnClicked? null: "rgba(51, 155, 231, 1)"}
                                     fontColor={isOnClicked? "rgba(124,124,124,1)": "#FFF"}
                                     width="61px"
                                     height="36px"
                                     borderRadius="0 50px 50px 0"
                                     marginLeft="0px"
                                     onClick={() => setIsOnClicked(false)}
                       />
                   </div>
               }>
            *The problem for exam used should be unvisible
        </Block>
    </>;
};

export default Visible;