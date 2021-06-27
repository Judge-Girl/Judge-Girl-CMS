import React, {useState, useEffect} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {set} from "immutable";

function OutputMatchPolicyList({currentProblem, handleMatchPolicy}) {
    const judgePolicy = currentProblem.judgeMatchPolicyPluginTag.name

    return (
        <div>
            <SubtitleLine title={"Output Match Policy"}/>
            <div>
                <select value={judgePolicy} onChange={handleMatchPolicy}>
                    <option value="Add Match Policy" hidden>Add Match Policy</option>
                    <option value="All Match">All Match</option>
                    <option value="Test">test</option>
                </select>
            </div>

        </div>
    )
}

export default OutputMatchPolicyList