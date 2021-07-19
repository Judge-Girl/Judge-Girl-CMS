import "./rightbar.scss"
import ProblemEditorTitle from "../../problem/edit/ProblemEditorTitle";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import Tags from "./Tags";
import ProvidedCode from "./ProvidedCode";
import SubmittedCodeSpec from "./SubmittedCodeSpec";
import ResourceSpec from "./ResourceSpec";
import CompilationScript from "./CompilationScript";
import OutputMatchPolicy from "./OutputMatchPolicy";
import Visible from "./Visible";
import Description from "./Description";
import TestCases from "./TestCases";
import Actions from "./Actions";

const RightBar = () => {
    const {problemId} = useParams();
    const [currentProblem, setCurrentProblem] = useState(undefined);

    const fetchProblem = (problemId) => {
        problemService.getProblemById(problemId)
            .then(problem => {
                setCurrentProblem(problem);
            });
    };

    useEffect(() => {
        if (!currentProblem) {
            fetchProblem(problemId);
        }
    }, [currentProblem, problemId]);

    if (!currentProblem) {
        return <Spinner/>;
    }

    return <>
        <div className="problem-editor-rightbar">
            <ProblemEditorTitle problem={currentProblem}/>
            <Tags/><hr/>
            <ProvidedCode/><hr/>
            <SubmittedCodeSpec/><hr/>
            <ResourceSpec/><hr/>
            <CompilationScript/><hr/>
            <OutputMatchPolicy/><hr/>
            <Visible/><hr/>
            <Description/><hr/>
            <TestCases/><hr/>
            <Actions/>
        </div>
    </>;
}

export default RightBar;