import {useParams} from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import {Spinner} from '../../commons/Spinner';
import {TitleLine} from '../../commons/titles/TitleLine';
import ExamSummary from '../score/ExamSummary';
import ChartField from './ChartField';
import FakeLink from '../../commons/FakeLink';
import {Bar} from 'react-chartjs-2';
import {dataTemplate, optionsTemplate} from './ChartConfigTemplates';
import {examService, examTranscriptService} from '../../../services/services';
import {ExamScoreboardPresenter} from './ExamScoreboardPresenter';


const ExamScoreboardPage = () => {
	const {examId} = useParams();
	const [exam, setExam] = useState(undefined);
	const [presenter, setPresenter] = useState(undefined);

	useEffect(() => {
		if (!exam) {
			examService.getExam(examId)
				.then(setExam);
		}
	}, [exam, examId, setExam]);

	useEffect(() => {
		if (exam) {
			const subscription = examTranscriptService.pollingExamScoreboard(examId,
				examScoreboard => setPresenter(new ExamScoreboardPresenter(examScoreboard)));
			return () => subscription.unsubscribe();
		}
	}, [exam, examId, setPresenter]);

	if (!exam || !presenter)
		return <Spinner/>;

	return (
		<div className="exam-scoreboard">
			<div className="font-poppins" style={{paddingTop: '20px', paddingBottom: '150px'}}>
				<div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
					<div style={{
						width: 'fit-content',
						display: 'flex', flexDirection: 'column', justifyContent: 'flex-start'}}>
						<div style={{marginBottom: '3em'}}>
							<TitleLine title="Summary"/>
							<ExamSummary averageScore={presenter.crossAverage}
								maxScore={presenter.sumOfMaxScores}
								totalExaminees={presenter.totalExaminees}/>
						</div>
						<TitleLine title="Bar Charts"/>
						{presenter.examSummary.map(data =>
							<ChartField
								key={data.problemId}
								width={1200}
								title={
									<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
										<FakeLink>Question: {data.problemId} {data.problemTitle}</FakeLink>
										<div>No Submission: {data.chartData.noSubmission} / Average: {data.average}</div>
									</div>}
								charts={[
									<Bar key="testcases" type="bar"
										options={optionsTemplate('Students', 'testcases')}
										data={dataTemplate(
											data.chartData.testcasesLabels,
											data.chartData.testcasesData,
											'Students',
											{
												backgroundColor: ['rgba(75, 192, 192, 0.2)'],
												borderColor: ['rgba(75, 192, 192, 1)']
											}
										)}/>,
									<Bar key="total-pass-testcases" type="bar"
										options={optionsTemplate('Students', 'total pass testcases')}
										data={dataTemplate(
											data.chartData.totalPassLabels,
											data.chartData.totalPassData,
											'Students',
											{
												backgroundColor: ['rgba(54, 162, 235, 0.2)'],
												borderColor: ['rgba(54, 162, 235, 1)']
											}
										)}/>
								]}/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};


export default ExamScoreboardPage;
