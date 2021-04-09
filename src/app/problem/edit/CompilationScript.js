import React from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import './CompilationScript.css';

function CompilationScript() {
    return (
        <div>
            <SubtitleLine title={"Compilation Script"}/>
            <button className="button compile-script-button">Auto Generate</button>
            <textarea className="compile-script-text-area" cols="40" rows="5"/>

        </div>
    )
}

export default CompilationScript;
