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
import {Hr} from "./Hr";


const RightBar = () => {
    return <>
        <div className="right-bar">
            <ProblemTitle/>
            <Tags/><Hr/>
            <ProvidedCode/><Hr/>
            <SubmittedCodeSpec/><Hr/>
            <ResourceSpec/><Hr/>
            <CompilationScript/><Hr/>
            <OutputMatchPolicy/><Hr/>
            <Visible/><Hr/>
            <Description/><Hr/>
            <TestCases/>
            <Actions/>
        </div>
    </>;
}

export default RightBar;