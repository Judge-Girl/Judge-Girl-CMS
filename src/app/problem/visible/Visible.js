import '../ProblemEditor.css';
import {SubtitleLine} from "../../commons/titles/TitleLine";


function Visible () {
    return (
        <div>
            <SubtitleLine title={"Visible"} />
            <div className="control">
                <label className="radio">
                    <input type="radio" name="visible" checked />
                        visible
                </label>
                <label className="radio">
                    <input type="radio" name="invisible" />
                        invisible (for exam)
                </label>
            </div>
        </div>
    )
};

export default Visible;