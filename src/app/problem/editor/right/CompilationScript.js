import './CompilationScript.scss';
import Block from './Block';
import {useEffect, useState} from 'react';
import {EditSaveCancelButton} from '../../commons/EditSaveCancelButton';
import {EditorButton} from '../../commons/EditorButton';
import {problemService} from '../../../../services/services';
import {ACTION_UPDATE_LANGUAGE_ENV, useProblemEditorContext} from '../context';

const CompilationScript = () => {
	const {problem, dispatch} = useProblemEditorContext();
	const [compilation, setCompilation] = useState(undefined);
	const [compilationBackup, setCompilationBackup] = useState(undefined);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (problem) {
			if (!compilation) {
				setCompilation(problem.languageEnvs[0].compilation);
				if (!compilationBackup) {
					setCompilationBackup(problem.languageEnvs[0].compilation);
				}
			}
		}
	}, [problem, compilation, setCompilation, compilationBackup, setCompilationBackup]);

	const onClickEdit = () => {
		setIsEditing(true);
	};

	const onClickSave = () => {
		setIsEditing(false);
		const newLanguageEnv = {...problem.languageEnvs[0], compilation};
		problemService.updateLanguageEnv(problem.id, newLanguageEnv)
			.then(() => {
				dispatch({type: ACTION_UPDATE_LANGUAGE_ENV, languageEnv: newLanguageEnv});
				setCompilationBackup(compilation);
				console.log('The problem\'s compilation script has been updated');
			});
	};

	const onClickCancel = () => {
		setIsEditing(false);
		setCompilation(compilationBackup);
	};

	if (!compilation) {
		return '';
	}
	return <>
		<Block title="Compilation Script"
			id="problem-editor-compilation-script"
			titleButton={
				<EditSaveCancelButton
					isEditing={isEditing}
					onClickEdit={onClickEdit}
					onClickSave={onClickSave}
					onClickCancel={onClickCancel}/>
			}>

			<div className={'compilation-script'}>
				{isEditing ?
					<>
						<textarea className="compile-script-text-area"
							placeholder="gcc a.out -o main.c"
							value={compilation.script}
							onChange={e => setCompilation({...compilation, script: e.target.value})}/>
						<EditorButton text="Auto Generate"
							type="file"
							buttonColor="rgba(236, 112, 99, 1)"
							fontSize="16px"
							fontColor="#fff"
							width="11em"
							height="36px"
							borderRadius="50px"
							onClick={undefined} disabled/>
					</>: <div>{compilation.script}</div>
				}
			</div>
		</Block>
	</>;
};

export default CompilationScript;
