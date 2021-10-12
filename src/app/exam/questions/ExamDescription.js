import './ExamDescription.scss';
import React, {useEffect, useState} from 'react';
import {examService} from '../../../services/services';
import Block from '../../problem/editor/right/Block';
import {EditSaveCancelButton} from '../../problem/commons/EditSaveCancelButton';
import MarkdownEditor from '../../problem/commons/MarkdownEditor';
import MarkdownEditorWriteTab from '../../problem/commons/MarkdownEditorWriteTab';
import MarkdownEditorPreviewTab from '../../problem/commons/MarkdownEditorPreviewTab';


const ExamDescription = ({examId}) => {
	const FIRST_TAB_INDEX = 1;
	const [isEditing, setIsEditing] = useState(false);
	const [markdownText, setMarkdownText] = useState(undefined);
	const [exam, setExam] = useState(undefined);
	const [markdownTextBackUp, setMarkdownTextBackUp] = useState(undefined);

	useEffect(() => {
		if (!markdownText)
			examService.getExam(examId)
				.then(exam => {
					setExam(exam);
					setMarkdownText(exam.description);
				});
	}, [markdownText, examId, setMarkdownText]);

	const onClickEdit = () => {
		setMarkdownTextBackUp(markdownText);
		setIsEditing(true);
	};

	const onClickSave = () => {
		setIsEditing(false);
		examService.updateExam(examId, {
			examId,
			name: exam.name,
			startTime: exam.startTime,
			endTime: exam.endTime,
			description: markdownText
		}).then(() =>
			console.log('The exam\'s description has been modified')
		);
	};

	const onClickCancel = () => {
		setIsEditing(false);
		setMarkdownText(markdownTextBackUp);
	};

	return <>
		<div className="exam-description-editor">
			<div className="right-bar" style={{width: '100%', padding: '0'}}>
				<Block title="Description"
					id="exam-description"
					buttonPos="down"
					titleButton={
						<EditSaveCancelButton isEditing={isEditing}
							onClickEdit={onClickEdit}
							onClickSave={onClickSave}
							onClickCancel={onClickCancel}/>
					}>
					<MarkdownEditor className="markdown"
						tags={[
							{title: 'Write', component: <MarkdownEditorWriteTab initialMarkdownText={markdownText}
								onMarkdownTextChange={setMarkdownText}/>},
							{title: 'Preview', component: <MarkdownEditorPreviewTab markdownText={markdownText}/>},
						]}
						defaultTabIndex={FIRST_TAB_INDEX}
						isEditing={isEditing}/>
				</Block>
			</div>
		</div>
	</>;
};


export default ExamDescription;
