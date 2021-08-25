import "./ProblemEditor2.scss"
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
        <div id="problem-editor-2" className="problem-editor-2">
            <LeftBar/>
            <RightBar/>
        </div>
    </>;
}

export default ProblemEditor2;