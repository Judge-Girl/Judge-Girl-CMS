import {withRouter} from "react-router";
import './ProblemEditor.css';
import TagList from "./edit/TagList";
import SubmittedCodeList from './edit/SubmittedCodeList';
import ProvidedCodeList from './edit/providedCode/ProvidedCodeList';
import ResourceSpec from "./edit/ResourceSpec";
import CompilationScript from "./edit/CompilationScript";
import OutputMatchPolicyList from "./edit/OutputMatchPolicyList";
import Visible from "./edit/Visible";
import Description from "./edit/Description";
import {EditorButton} from "./edit/EditorButton";


const ProblemEditor = withRouter(({history}) => {

    return (
        // TODO: Navigation Bar
        <div className="columns problem-editor">
            <div className="column left">
                <section>
                    <TagList/>
                </section>
                <section>
                    <ProvidedCodeList/>
                </section>
                <section>
                    <SubmittedCodeList/>
                </section>
                <section>
                    <ResourceSpec/>
                </section>
                <section>
                    <CompilationScript/>
                </section>
                <section>
                    <OutputMatchPolicyList/>
                </section>
                <section>
                    <Visible/>
                </section>
                <section>
                    <EditorButton text={"Save Change"} buttonColor={"#96D745"} fontColor={"#FFFFFF"}/>
                    <EditorButton text={"Delete Problem"} buttonColor={"#FFFFFF"} fontColor={"#A2A3B1"}/>
                </section>
            </div>
            <div className="column right">
                <section>
                    <Description/>

                </section>
            </div>
        </div>
    );
});

export {ProblemEditor};
