import React, {useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import './Visible.css';

function Visible({currentProblem}) {
    const [visible, setVisible] = useState(currentProblem.visible === true)

    return (
        <div>
            <SubtitleLine title={"Visible"}/>
            <div className="control" onChange={(e) => setVisible(e.target.value)}>
                <label className="radio">
                    <input type="radio" value={true} defaultChecked name="visible"/>
                    visible
                </label>
                <label className="radio">
                    <input type="radio" value={false} name="visible"/>
                    invisible (for exam)
                </label>
            </div>
        </div>
    )
}

export default Visible;