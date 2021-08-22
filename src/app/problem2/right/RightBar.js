import "./rightbar.scss"
import Tags from "./Tags";
import ProvidedCode from "./ProvidedCode";
import SubmittedCodeSpec from "./SubmittedCodeSpec";
import ResourceSpec from "./ResourceSpec";
import CompilationScript from "./CompilationScript";
import OutputMatchPolicy from "./OutputMatchPolicy";
import Visible from "./Visible";
import Description from "./Description";
import TestCases from "./TestCases";
import Actions from "./Actions";
import ProblemTitle from "./ProblemTitle";


const RightBar = () => {
    return <>
        <div className="problem-editor-rightbar">
            <ProblemTitle/><hr/>
            <Tags/><hr/>
            <ProvidedCode/><hr/>
            <SubmittedCodeSpec/><hr/>
            <ResourceSpec/><hr/>
            <CompilationScript/><hr/>
            <OutputMatchPolicy/><hr/>
            <Visible/><hr/>
            <Description/><hr/>
            <TestCases/>
            <Actions/>
        </div>
    </>;
}

export default RightBar;