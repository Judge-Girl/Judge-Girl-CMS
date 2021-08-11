import React, {useEffect, useState} from "react";
import LeftBar from "./left/LeftBar";
import {problemService} from "../../services/services";
import {Spinner} from "../commons/Spinner";
import RightBar from "./right/RightBar";


const ProblemEditor2 = () => {
    const [currentProblem, setCurrentProblem] = useState(undefined);

    const fetchProblem = (problemId) => {
        problemService.getProblemById(problemId)
            .then(problem => {
                setCurrentProblem(problem);
            });
    };

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
                <div style={{width: "900px", flexShrink: "0"}}>
                    <RightBar/>
                </div>
            </div>
        </div>
    </>;
}

export default ProblemEditor2;