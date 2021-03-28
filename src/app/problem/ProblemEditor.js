import {withRouter} from "react-router";
import './ProblemEditor.css';
import TagList from "./tags/TagList";
import SubmittedCodeList from './submittedCode/SubmittedCodeList';
import ProvidedCodeList from './providedCode/ProvidedCodeList';
import ResourceSpec from "./resourceSpec/ResourceSpec";
import CompilationScript from "./compilationScript/CompilationScript";
import OutputMatchPolicyList from "./outputMatchPolicy/OutputMatchPolicyList";
import Visible from "./visible/Visible";
import SaveChangeButton from "./saveChangeButton/SaveChangeButton";
import DeleteProblemButton from "./deleteProblemButton/DeleteProblemButton";
import Description from "./description/Description";


const ProblemEditor = withRouter(({history}) =>  {

    return (
        // TODO: Navigation Bar
        <div className="columns problem-editor">
            <div className="column left">
                <section>
                    <TagList />
                </section>
                <section>
                    <ProvidedCodeList />
                </section>
                <section>
                    <SubmittedCodeList />
                </section>
                <section>
                    <ResourceSpec />
                </section>
                <section>
                    <CompilationScript />
                </section>
                <section>
                    <OutputMatchPolicyList />
                </section>
                <section>
                    <Visible />
                </section>
                <section>
                    <SaveChangeButton />
                    <DeleteProblemButton />
                </section>
            </div>
            <div className="column right">
                <section>
                    <Description />

                </section>
            </div>
        </div>
    );
});

export {ProblemEditor};
