import '../../ProblemEditor.css';
import {SubtitleLine} from "../../../commons/titles/TitleLine";
import React from "react";
import './MarkdwonEditor.scss';
import MarkdownEditor from "./MarkdownEditor";

function Description({problemId}) {
    return (
        <div>
            <SubtitleLine title={"Description"}/>
            <MarkdownEditor problemId={problemId}/>
        </div>
    )
}

export default Description;
