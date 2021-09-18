import {EditorButton} from "../../commons/EditorButton";
import Block from "./Block";
import {useState} from "react";
import {useProblemEditorContext} from "../ProblemEditorContext";
import {problemService} from "../../../../services/services";
import {useParams} from "react-router-dom";


const Visible = () => {
    const {problemId} = useParams();
    const {fetchAllProblems} = useProblemEditorContext();
    const [isOnClicked, setIsOnClicked] = useState();

    const onVisibleButtonClick = (isVisibleButtonClicked) => {
        setIsOnClicked(isVisibleButtonClicked);
        problemService.updateProblemVisible(problemId, isVisibleButtonClicked)
            .then(() => {
                console.log("The problem's visible has been modified");
                fetchAllProblems();
            });
    }

    return <>
        <Block title="Visible"
               id="problem-editor-visible"
               titleButton={
                   <div style={{display: "flex", flexDirection: "row"}}>
                       {/* TODO: Should be refactored into a component. */}
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
            *The problem for exam used should be unvisible
        </Block>
    </>;
};

export default Visible;