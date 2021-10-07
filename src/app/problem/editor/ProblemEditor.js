import "./ProblemEditor.scss"
import LeftBar from "./left/LeftBar";
import RightBar from "./right/RightBar";
import {ACTION_INITIALIZE, Context} from "../editor/context";
import {problemService} from "../../../services/services";
import {useParams} from "react-router";
import {useEffect, useReducer} from "react";
import {reducer} from "./context";


const ProblemEditor = () => {
    const {problemId} = useParams();
    const [problem, dispatch] = useReducer(reducer, undefined);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(problem => dispatch({type: ACTION_INITIALIZE, problem}));
        }
    });

    return <>
        <Context.Provider value={{problem, dispatch}}>
            <div id="problem-editor" className="problem-editor">
                <LeftBar/><RightBar/>
            </div>
        </Context.Provider>
    </>;
};

export default ProblemEditor;
