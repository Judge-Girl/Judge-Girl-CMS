import '../ProblemEditorOld.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";
import {InlineInputBox} from "../../problem/commons/InlineInputBox";

function ResourceSpec() {
    return (
        <div>
            <SubtitleLine title={"Resource Spec"}/>
            <InlineInputBox title="CPU"/>
            <InlineInputBox title="GPU"/>
        </div>

    )
}

export default ResourceSpec;
