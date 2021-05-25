import {Redirect, useParams} from "react-router-dom";
import ProblemEditorTitle from "./edit/ProblemEditorTitle";
import TagList from "./edit/TagList";
import ProvidedCodeList from './edit/providedCode/ProvidedCodeList';
import SubmittedCodeList from './edit/SubmittedCodeList';
import ResourceSpec from "./edit/ResourceSpec";
import CompilationScript from "./edit/CompilationScript";
import OutputMatchPolicyList from "./edit/OutputMatchPolicyList";
import Visible from "./edit/Visible";
import {EditorButton} from "./edit/EditorButton";
import {SubtitleLine} from "../commons/titles/TitleLine";
import MarkdownEditor from "../commons/MarkdownEditor";
import TestCase from "./edit/testCase/TestCasesList";
import React, {useEffect, useState} from "react";
import './ProblemEditor.css';
import {Spinner} from "../commons/Spinner";
import {useProblemContext} from "./list/ProblemContext";

const ProblemEditor = () => {
    const {problemId} = useParams()
    const {currentProblem, setCurrentProblem, refetchProblem, setShouldRedirect} = useProblemContext()
    const [problemSaved, setProblemSaved] = useState(false)

    useEffect(() => {
        if (!currentProblem) {
            refetchProblem(problemId)
        }
    }, [currentProblem, refetchProblem, problemId])

    if (!currentProblem) {
        return <Spinner/>
    }

    if (problemSaved) {
        setCurrentProblem(null)
        setShouldRedirect(false)
        return <Redirect to="/problems"/>
    }

    return (
        <div className="problem-editor">
            <div style={{padding: "20px 10% 200px 10%", backgroundColor: "#FFFFFF"}}>
                <div style={{
                    display: "flex", flexDirection: "column",
                    justifyContent: "flex-start", alignItems: "flex-start",
                }}>
                    <div className="pt-2">
                        <ProblemEditorTitle problem={currentProblem}/>
                    </div>
                    <div style={{
                        display: "flex", flexDirection: "row",
                        justifyContent: "space-between", alignItems: "flex-start",
                    }}>
                        <div style={{width: "25%"}}>
                            <section>
                                <TagList/>
                            </section>
                            <section>
                                <ProvidedCodeList/>
                            </section>
                            <section>
                                <SubmittedCodeList/>
                            </section>
                            <section>
                                <ResourceSpec/>
                            </section>
                            <section>
                                <CompilationScript/>
                            </section>
                            <section>
                                <OutputMatchPolicyList/>
                            </section>
                            <section>
                                <Visible/>
                            </section>
                            <section>
                                <EditorButton text={"Save Change"} buttonColor={"#96D745"} fontColor={"#FFFFFF"}
                                              onClick={() => setProblemSaved(true)}/>
                                <EditorButton text={"Delete Problem"} buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}/>
                            </section>
                        </div>
                        <div style={{width: "65%"}}>
                            <section>
                                <SubtitleLine title={"Description"}/>
                                <MarkdownEditor problemId={problemId}/>
                            </section>
                            <section>
                                <TestCase/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export {ProblemEditor};
