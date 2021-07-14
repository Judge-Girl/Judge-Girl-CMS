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
import TestCasesList from "./edit/testCase/TestCasesList";
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
    const [isProblemArchived, setIsProblemArchived] = useState(false);
    const [problemAttributes, setProblemAttributes] = useState('');
    const [matchPolicyList, setMatchPolicyList] = useState(undefined);
    const [providedCodesFiles, setProvidedCodesFiles] = useState(undefined);

    const fetchProblem = (problemId) => {
        problemService.getProblemById(problemId)
            .then(problem => {
                setCurrentProblem(problem);
                setProblemDescription(problem.description || 'Press Edit Description to start writing the description. Styling with Markdown is supported.\n');
                setIsProblemArchived(problem.archived);

                if (problem.languageEnvs.length === 0) {
                    problem.languageEnvs.push({
                        "name":"C",
                        "language":"C",
                        "compilation":{"script":"gcc -std=c99 -O2 a.c -lm"},
                        "resourceSpec":{"cpu":1.0,"gpu":0.0},
                        "submittedCodeSpecs":[
                            {
                                "format":"C",
                                "fileName":"a.c"
                            }
                        ],
                        "providedCodesFileId":""
                    })
                }
            })
            .catch(reason => setProblemNotFound(true));
    }

    const onProblemSaved = () => {
        setShouldRedirect(true)

        problemService.modifyProblem(problemId, currentProblem.tags, currentProblem.visible, currentProblem.judgeMatchPolicyPluginTag)
            .then((res) => console.log(res));

        for (let i = 0; i < currentProblem.languageEnvs.length; i++) {
            const requestBody = {
                "language": currentProblem.languageEnvs[i].language,
                "compilation": currentProblem.languageEnvs[i].compilation,
                "compilationScript": currentProblem.languageEnvs[i].compilation.script,
                "resourceSpecCpu": currentProblem.languageEnvs[i].resourceSpec.cpu,
                "resourceSpecGpu": currentProblem.languageEnvs[i].resourceSpec.gpu,
                "submittedCodeSpecs": currentProblem.languageEnvs[i].submittedCodeSpecs
            }
            // console.log('requestBody', requestBody)
            problemService.modifyProblemLanguageEnvs(problemId, currentProblem.languageEnvs[i].name, requestBody)

            if (providedCodesFiles.length > 1 || (providedCodesFiles.length === 1 && providedCodesFiles[0] instanceof File)) {
                const data = new FormData()
                for (let j = 0; j < providedCodesFiles.length; j++) {
                    if (providedCodesFiles[j] instanceof File) {
                        console.log(providedCodesFiles[j])
                        data.append('file', providedCodesFiles[j])
                    }
                }
                problemService.updateProblemProvidedCodes(problemId, currentProblem.languageEnvs[i].name, data)
            }
        }
    }

    useEffect(() => {
        if (!currentProblem) {
            fetchProblem(problemId);
        }
        if (!matchPolicyList) {
            problemService.getJudgeMatchPolicyPluginTag()
                .then((res) => {
                    setMatchPolicyList(Object.values(res.data))
                })
        }
    }, [currentProblem, matchPolicyList, problemId])

    const handleTagsChange = (tags) => {
        setCurrentProblem((prevState) => {
            prevState.tags = tags
            return prevState
        })
    }

    const handleProvidedCodesFilesChange = (files) => {
        setProvidedCodesFiles(files)
    }

    const handleSubmittedCodesChange = (tags) => {
        setCurrentProblem((state) => {
            state.languageEnvs[0].submittedCodeSpecs = tags
            return state
        })
    }

    const handleVisible = (visible) => {
        setCurrentProblem((state) => {
            state.visible = visible
            return state
        })
    }

    const handleResourceSpecCPU = (cpu) => {
        setCurrentProblem((state) => {
            state.languageEnvs[0].resourceSpec.cpu = cpu
            return state
        })
    }

    const handleResourceSpecGPU = (gpu) => {
        setCurrentProblem((state) => {
            state.languageEnvs[0].resourceSpec.gpu = gpu
            return state
        })
    }

    const handleCompilationScript = (script) => {
        setCurrentProblem((state) => {
            state.languageEnvs[0].compilation.script = script
            return state
        })
    }

    if (problemNotFound) {
        return <ProblemNotFound/>
    } else if (shouldRedirect) {
        return <Redirect to="/problems"/>
    } else if (!currentProblem || !matchPolicyList) {
        return <Spinner/>
    }

    const ArchiveProblemButton = () => {
        return (
            <EditorButton text={"Archive this problem"}
                          marginTop={10}
                          borderColor={"#A2A3B1"}
                          buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}
                          onClick={() => {
                              problemService.archiveOrDeleteProblem(problemId)
                                  .then(() => fetchProblem(problemId));
                          }}/>
        )
    }

    const RestoreAndDeleteProblemButtons = () => {
        return (
            <>
                <EditorButton text={"Restore the problem"}
                              marginTop={10}
                              buttonColor={"#FFE7AB"} fontColor={"#F1960D"}
                              onClick={() => {
                                  problemService.restoreProblem(problemId)
                                      .then(() => fetchProblem(problemId));
                              }}/>
                <EditorButton text={"Delete this problem"}
                              marginTop={10}
                              borderColor={"#A2A3B1"}
                              buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}
                              onClick={() => {
                                  problemService.archiveOrDeleteProblem(problemId)
                                      .then(() => setShouldRedirect(true));
                              }}/>
            </>
        )
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
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        alignItems: "flex-start",
                    }}>
                        <div style={{width: "350px"}}>
                            <section>
                                <TagList currentProblem={currentProblem} handleTagsChange={handleTagsChange}/>
                            </section>
                            <section>
                                <ProvidedCodeList currentProblem={currentProblem} handleProvidedCodesFilesChange={handleProvidedCodesFilesChange}/>
                            </section>
                            <section>
                                <SubmittedCodeList currentProblem={currentProblem} handleSubmittedCodesChange={handleSubmittedCodesChange}/>
                            </section>
                            <section>
                                <ResourceSpec currentProblem={currentProblem} handleResourceSpecCPU={handleResourceSpecCPU} handleResourceSpecGPU={handleResourceSpecGPU}/>
                            </section>
                            <section>
                                <CompilationScript currentProblem={currentProblem} handleCompilationScript={handleCompilationScript}/>
                            </section>
                            <section>
                                <OutputMatchPolicyList currentProblem={currentProblem} setCurrentProblem={setCurrentProblem} matchPolicyList={matchPolicyList}/>
                            </section>
                            <section>
                                <Visible currentProblem={currentProblem} handleVisible={handleVisible} setCurrentProblem={setCurrentProblem}/>
                            </section>
                            <section>
                                <EditorButton text={"Save Change"} buttonColor={"#96D745"}
                                              fontColor={"#FFFFFF"}
                                              onClick={onProblemSaved}/>
                                {isProblemArchived ? <RestoreAndDeleteProblemButtons/> : <ArchiveProblemButton/>}
                            </section>
                        </div>
                        <div style={{width: "100px"}}/>
                        <div style={{width: "950px"}}>
                            <section>
                                <SubtitleLine title={"Description"}/>
                                <MarkdownEditor text={problemDescription}
                                                currentProblem={currentProblem}
                                                onTextChanged={setProblemDescription}
                                                editingState={editingState}
                                                editorButtons={editingState ?
                                                    <HandleDescriptionButtons/> : <EditDescriptionButton/>
                                                }
                                                style={{backgroundColor: "var(--backgroundDim)"}}/>
                            </section>
                            <section>
                                <TestCasesList testcases={currentProblem.testcases}/>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export {ProblemEditor};
