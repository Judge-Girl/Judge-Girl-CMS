import React, {useState} from 'react';
import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import './Visible.css';

function Visible({currentProblem, handleVisible, setCurrentProblem}) {
    const [visible, setVisible] = useState(currentProblem.visible === true ? "visible" : "invisible")

    const handleChange = (e) => {
        const isVisible = (e.target.value === "visible")
        setVisible(e.target.value)
        handleVisible( isVisible )
    }

    return (
        <div>
            <SubtitleLine title={"Visible"}/>
            <div className="control">
                <label className="radio">
                    <input type="radio" value={"visible"} checked={(visible === "visible")} name="visible"  onChange={handleChange}/>
                    visible
                </label>
                <label className="radio">
                    <input type="radio" value={"invisible"} checked={(visible === "invisible")} name="visible"  onChange={handleChange}/>
                    invisible (for exam)
                </label>
            </div>
        </div>
    )
}

export default Visible;