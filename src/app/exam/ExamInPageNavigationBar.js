import {AiFillYoutube, AiOutlineSetting, FaClipboardList, FaRegChartBar, FaRegEdit, FaUserFriends} from 'react-icons/all';
import {useEffect, useState} from 'react';
import {useHistory, useParams, useRouteMatch} from 'react-router-dom';
import {InPageNavigationBar} from '../commons/IndexBanner/InPageNavigationBar';
import {examService} from '../../services/services';
import {useExamContext} from './questions/ExamContext';

const ExamInPageNavigationBar = () => {
	const history = useHistory();
	const {url} = useRouteMatch();
	const {examId} = useParams();
	const [exam, setExam] = useState(undefined);
	const {shouldUpdate} = useExamContext();

	useEffect(() => {
		if (!exam || shouldUpdate) {
			examService.getExam(examId)
				.then(setExam);
		}
	}, [exam, shouldUpdate, examId, setExam]);

	const onBreadcrumbClickAtIndex = (index) => {
		const BACK_TO_EXAM_LIST = 0;
		switch (index) {
		case BACK_TO_EXAM_LIST:
			history.push('/exams');
			break;
		default:
			console.log('WARNING: onBreadcrumbClickAtIndex index out of range.');
		}
	};

	if (!exam) {
		return <></>;
	}

	return (
		<InPageNavigationBar currentURL={url}
			path={{
				head: 'Exam',
				tail: exam.name
			}}
			onBreadcrumbClickAtIndex={onBreadcrumbClickAtIndex}
			tabContents={[
				{
					to: `/exams/${examId}/problems`,
					name: 'Questions',
					icon: FaRegEdit
				},
				{
					to: `/exams/${examId}/students`,
					name: 'Examinees',
					icon: FaUserFriends
				},
				{
					to: `/exams/${examId}/submissions`,
					name: 'Live Submission',
					icon: AiFillYoutube
				},
				{
					to: `/exams/${examId}/scoreboard`,
					name: 'Scoreboard',
					icon: FaRegChartBar
				},
				{
					to: `/exams/${examId}/score`,
					name: 'Score',
					icon: FaClipboardList
				},
				{
					to: `/exams/${examId}/options`,
					name: 'Options',
					icon: AiOutlineSetting
				}
			]}
		/>
	);
};

export {ExamInPageNavigationBar};
