import React, {useEffect, useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";

function OutputMatchPolicyList({currentProblem, setCurrentProblem, matchPolicyList}) {
    const [judgePolicy, setJudgePolicy] = useState(currentProblem.judgeMatchPolicyPluginTag.name)

    const handleChange = (e) => {
        setJudgePolicy(e.target.value)
        setCurrentProblem((state) => {
            state.judgeMatchPolicyPluginTag.name = e.target.value
            return state
        })
    }

    return  (
        <div>
            <SubtitleLine title={"Output Match Policy"}/>
            <div>
                <select value={judgePolicy} onChange={handleChange}>
                    <MatchPolicyOption matchPolicyList={matchPolicyList}/>
                </select>
            </div>
        </div>
    )
}

function MatchPolicyOption({matchPolicyList}) {
    // console.log(matchPolicyList)
    return matchPolicyList.map((policy) => (
        <option value={policy.name}>{policy.name}</option>
    ))
}

export default OutputMatchPolicyList