import {EditorButton} from "../../commons/EditorButton";
import Block from "./Block";
import {useEffect, useState} from "react";
import {ACTION_UPDATE_VISIBILITY, useProblemEditorContext} from "../context";
import {problemService} from "../../../../services/services";

const Visible = () => {
    const {problem, dispatch} = useProblemEditorContext();
    const [isOnClicked, setIsOnClicked] = useState(undefined);

    useEffect(() => {
       if (problem) {
           if (isOnClicked === undefined) {
               setIsOnClicked(problem.visible);
           }
       }
    }, [problem, isOnClicked, setIsOnClicked]);

    const onVisibleButtonClick = (isVisibleButtonClicked) => {
        if (isVisibleButtonClicked !== isOnClicked) {
            setIsOnClicked(isVisibleButtonClicked);
            problemService.updateProblemVisibility(problem.id, isVisibleButtonClicked)
                .then(() => {
                    console.log(`The problem's visibility has been modified to --> ${isVisibleButtonClicked}`);
                    dispatch({type: ACTION_UPDATE_VISIBILITY, visible: isVisibleButtonClicked});
                });
        }
    };

    return <>
        <Block title="Visible"
               id="problem-editor-visible"
               titleButton={
                   <div style={{display: "flex", flexDirection: "row"}}>
                       <EditorButton text="ON"
                                     buttonColor={isOnClicked ? "rgba(51, 155, 231, 1)" : null}
                                     fontColor={isOnClicked ? "#FFF" : "rgba(124,124,124,1)"}
                                     width="61px"
                                     height="36px"
                                     borderRadius="50px 0 0 50px"
                                     marginRight="-2px"
                                     onClick={() => onVisibleButtonClick(true)}
                       />
                       <EditorButton text="OFF"
                                     buttonColor={isOnClicked ? null : "rgba(51, 155, 231, 1)"}
                                     fontColor={isOnClicked ? "rgba(124,124,124,1)" : "#FFF"}
                                     width="61px"
                                     height="36px"
                                     borderRadius="0 50px 50px 0"
                                     marginLeft="0px"
                                     onClick={() => onVisibleButtonClick(false)}
                       />
                   </div>
               }>
            * The problem for exam used should be invisible. <br/>
            * If the problem is invisible, you can only see this problem in <i>invisible problem list</i>.
        </Block>
    </>;
};

export default Visible;
