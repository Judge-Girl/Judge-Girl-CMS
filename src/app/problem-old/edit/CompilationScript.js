import '../ProblemEditorOld.css';
import './CompilationScript.css';
import {SubtitleLine} from '../../commons/titles/TitleLine';

function CompilationScript() {
	return (
		<div>
			<SubtitleLine title={'Compilation Script'}/>
			<button className="button compile-script-button">Auto Generate</button>
			<textarea className="compile-script-text-area" cols="40" rows="5" style={{resize: 'vertical'}}/>
		</div>
	);
}

export default CompilationScript;
