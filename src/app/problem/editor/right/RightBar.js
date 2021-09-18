import Tags from "./Tags";
import ProvidedCode from "./ProvidedCode";
import SubmittedCodeSpec from "./SubmittedCodeSpec";
import ResourceSpec from "./ResourceSpec";
import CompilationScript from "./CompilationScript";
import OutputMatchPolicy from "./OutputMatchPolicy";
import Visible from "./Visible";
import ProblemDescription from "./ProblemDescription";
import TestCases from "./TestCases";
import Actions from "./Actions";
import ProblemTitle from "./ProblemTitle";
import {Divider} from "./Divider";


const RightBar = () => {
    return <>
        <div className="right-bar">
            <ProblemTitle/>

            <Tags/>
            <Divider/>

            <ProvidedCode/>
            <Divider/>

            <SubmittedCodeSpec/>
            <Divider/>

            <ResourceSpec/>
            <Divider/>

            <CompilationScript/>
            <Divider/>

            <OutputMatchPolicy/>
            <Divider/>

            <Visible/>
            <Divider/>

            <ProblemDescription/>
            <Divider/>

            <TestCases/>
            <Divider/>

            <Actions/>
        </div>
    </>;
}

export default RightBar;