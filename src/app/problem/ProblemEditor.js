import {useParams} from "react-router-dom";
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
import React from "react";
import './ProblemEditor.css';

const ProblemEditor = () => {
    const problemId = useParams()

    return (
        <div className="problem-editor">
            <ProblemEditorTitle problemId={problemId}/>
            <div className="columns">
                <div className="column left">
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
                        <EditorButton text={"Save Change"} buttonColor={"#96D745"} fontColor={"#FFFFFF"}/>
                        <EditorButton text={"Delete Problem"} buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}/>
                    </section>
                </div>
                <div className="column right">
                    <section>
                        <SubtitleLine title={"Description"}/>
                        <MarkdownEditor problemId={problemId}/>
                    </section>
                    <section>
                        <TestCase />
                    </section>
                </div>
            </div>
        </div>
    );
}

export {ProblemEditor};
