import React from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/TitleLine";

function ResourceSpec () {
    return (
        <div>
            <SubtitleLine title={"Resource Spec"} />
            <li>
                <span>CPU</span>
                <input type="text" className="resource-spec-input-box" /></li>
            <li>
                <span>GPU</span>
                <input type="text" className="resource-spec-input-box" /></li>
        </div>

    )
}

export default ResourceSpec;
