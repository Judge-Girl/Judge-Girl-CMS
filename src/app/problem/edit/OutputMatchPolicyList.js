import React, {useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";

function OutputMatchPolicyList({problemAttributes}) {
    const [judgePolicy, setJudgePolicy] = useState(problemAttributes.judgeMatchPolicyPluginTag.name)
    const handleChange = (e) => {
        e.preventDefault()
        setJudgePolicy(e.target.value)
    }

    return (
        <div>
            <SubtitleLine title={"Output Match Policy"}/>
            <div>
                <select value={judgePolicy} onChange={handleChange}>
                    <option value="Add Match Policy" hidden>Add Match Policy</option>
                    <option value="All Match">All Match</option>
                </select>
            </div>

        </div>
    )
}

export default OutputMatchPolicyList