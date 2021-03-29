import React from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {InlineInputBox} from "../../commons/ProblemEditorPage/ProblemEditorPage";

function ResourceSpec () {
    return (
        <div>
            <SubtitleLine title={"Resource Spec"} />
            <InlineInputBox title="CPU" />
            <InlineInputBox title="GPU" />
        </div>

    )
}

export default ResourceSpec;
