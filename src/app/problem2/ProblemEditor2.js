import React, {useCallback, useEffect} from "react";
import LeftBar from "./left/LeftBar";
import {problemService} from "../../services/services";
import {Spinner} from "../commons/Spinner";
import RightBar from "./right/RightBar";
import {useParams} from "react-router-dom";
import {useProblemEditorContext} from "./ProblemEditorContext";


const ProblemEditor2 = () => {
    const {problemId} = useParams();
    const {currentProblem, setCurrentProblem} = useProblemEditorContext();
    const fetchProblem = useCallback(() => {
        problemService.getProblemById(problemId).then(setCurrentProblem);
    }, [problemId, setCurrentProblem]);

    useEffect(() => {
        if (!currentProblem) {
            fetchProblem();
        }
    }, [currentProblem, fetchProblem]);

    if (!currentProblem) {
        return <Spinner/>;
    }

    return <>
        <div className="problem-editor problem-editor-2" id="problem-editor-2">
            <div style={{
                paddingTop: "50px", paddingBottom: "500px",
                display: "flex", flexDirection: "row", justifyContent: "center",
            }}>
                <div style={{width: "200px", flexShrink: "0"}}>
                    <LeftBar/>
                </div>
                <div style={{width: "50px", flexShrink: "0"}}/>
                <div style={{width: "850px", flexShrink: "0"}}>
                    <RightBar/>
                </div>
                <div style={{width: "120px", flexShrink: "0"}}/>
            </div>
        </div>
    </>;
}

export default ProblemEditor2;