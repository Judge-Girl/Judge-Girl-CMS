import {withRouter} from "react-router";
import './ProblemEditor.css';
import TagList from "./tags/TagList";
import SubmittedCodeList from './submittedCode/SubmittedCodeList';
import ProvidedCodeList from './providedCode/ProvidedCodeList';
import ResourceSpec from "./resourceSpec/ResourceSpec";
import CompilationScript from "./compilationScript/CompilationScript";

const ProblemEditor = withRouter(({history}) =>  {
    return (
        <div className="columns problem-editor">
            <div className="column">
                <h1>Problem Name</h1>
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



            </div>
            <div className="column">
            </div>
        </div>
    );
});

export {ProblemEditor};
