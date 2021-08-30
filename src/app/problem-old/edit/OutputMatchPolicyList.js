import '../ProblemEditorOld.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";


function OutputMatchPolicyList() {
    return (
        <div>
            <SubtitleLine title={"Output Match Policy"}/>
            <div>
                <select>
                    <option value="" disabled selected hidden>Add Match Policy</option>
                    <option>All Match</option>
                </select>
            </div>

        </div>
    )
}

export default OutputMatchPolicyList