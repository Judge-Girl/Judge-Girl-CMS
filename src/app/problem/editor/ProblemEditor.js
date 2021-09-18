import "./ProblemEditor.scss"
import LeftBar from "./left/LeftBar";
import RightBar from "./right/RightBar";


const ProblemEditor = () => {
    return <>
        <div id="problem-editor" className="problem-editor">
            <LeftBar/><RightBar/>
        </div>
    </>;
};

export default ProblemEditor;
