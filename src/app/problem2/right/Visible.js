import {EditorButton} from "../../problem/edit/EditorButton";
import Block from "./Block";
import {useState} from "react";


const Visible = () => {
    const [isOnClicked, setIsOnClicked] = useState(false);

    return <>
        <Block title="Visible"
               id="problem-editor-visible"
               titleButton={
                   <div style={{display: "flex", flexDirection: "row"}}>
                       <EditorButton text="ON"
                                     buttonColor={isOnClicked? "rgba(51, 155, 231, 1)": null}
                                     fontColor={isOnClicked? "#FFF": null}
                                     width="63px"
                                     height="36px"
                                     borderRadius="50px 0 0 50px"
                                     marginRight="-2px"
                                     onClick={() => setIsOnClicked(true)}
                       />
                       <EditorButton text="OFF"
                                     buttonColor={isOnClicked? null: "rgba(51, 155, 231, 1)"}
                                     fontColor={isOnClicked? null: "#FFF"}
                                     width="63px"
                                     height="36px"
                                     borderRadius="0 50px 50px 0"
                                     marginLeft="0px"
                                     onClick={() => setIsOnClicked(false)}
                       />
                   </div>
               }>
        </Block>
    </>;
}

export default Visible;