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
import ProblemNotFound from "./ProblemNotFound";
import {problemService} from "../../services/services";

const ProblemEditor = () => {
    const {problemId} = useParams();
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const [problemNotFound, setProblemNotFound] = useState(false);
    const [currentProblem, setCurrentProblem] = useState(undefined);
    const [editingState, setEditingState] = useState(false);
    const [problemDescription, setProblemDescription] = useState(undefined);
    const [lastProblemDescription, setLastProblemDescription] = useState(problemDescription);

    const fetchProblem = (problemId) => {
        problemService.getProblemById(problemId)
            .then(problem => {
                setCurrentProblem(problem);
                setProblemDescription(problem.description || 'Press Edit Description to start writing the description. Styling with Markdown is supported.\n');
            })
            .catch(reason => setProblemNotFound(true));
    }

    const onProblemSaved = () => {
        setShouldRedirect(true);
    }

    useEffect(() => {
        if (!currentProblem) {
            fetchProblem(problemId);
        }
    }, [currentProblem, problemId])

    if (problemNotFound) {
        return <ProblemNotFound/>
    } else if (shouldRedirect) {
        return <Redirect to="/problems"/>
    } else if (!currentProblem) {
        return <Spinner/>
    }

    const HandleDescriptionButtons = () => {
        return (
            <>
                <EditorButton
                    text={"Save"}
                    buttonColor={"#96D745"}
                    fontColor={"#FFFFFF"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    marginTop={15} marginRight={4}
                    onClick={e => handleDescription(e)}/>
                <EditorButton
                    text={"Cancel"}
                    buttonColor={"#FFFFFF"}
                    fontColor={"#A2A3B1"}
                    width={83} height={33}
                    fontSize={15}
                    borderRadius={20}
                    borderColor={"#A2A3B1"}
                    marginTop={15} marginLeft={4}
                    onClick={() => {
                        setEditingState(false);
                        setProblemDescription(lastProblemDescription);
                    }}/>
            </>
        )
    }

    const EditDescriptionButton = () => {
        return (
            <EditorButton
                text={"Edit Description"}
                buttonColor={"#F2B311"}
                fontColor={"#FFFFFF"}
                width={209} height={33}
                fontSize={15}
                borderRadius={20}
                borderColor={"#F2B311"}
                marginTop={15}
                onClick={() => {
                    setEditingState(true);
                    setLastProblemDescription(problemDescription);
                }}/>
        )
    }

    const handleDescription = e => {
        e.preventDefault();
        // TODO: empty description notification
        if (problemDescription.length === 0) {
            return;
        }

        onProblemDescriptionChanged(problemDescription);

        setEditingState(false);
    };

    const onProblemDescriptionChanged = (description) => {
        if (currentProblem.description !== description) {
            problemService.modifyProblemDescription(problemId, description)
                .then(() => fetchProblem(problemId));
        }
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
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "flex-start",}}>
                        <div style={{width: "350px"}}>
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
                                              onClick={onProblemSaved}/>
                                <EditorButton text={"Delete Problem"} buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}/>
                            </section>
                        </div>
                        <div style={{width: "100px"}}/>
                        <div style={{width: "950px"}}>
                            <section>
                                <SubtitleLine title={"Description"}/>
                                <MarkdownEditor text={problemDescription}
                                                onTextChanged={setProblemDescription}
                                                editingState={editingState}
                                                editorButtons={editingState ?
                                                    <HandleDescriptionButtons/> : <EditDescriptionButton/>
                                                }
                                                style={{backgroundColor: "var(--backgroundDim)"}}/>
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
