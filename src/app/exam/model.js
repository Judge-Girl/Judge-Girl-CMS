
export class ExamScoreboard {

	constructor({examinees, examOverview, examTranscript, totalTestCasesOf}) {
		this.examinees = examinees;
		this.examQuestions = examOverview.questions.sort((q1, q2) => q1.questionOrder - q2.questionOrder);
		this.examTranscript = examTranscript;
		this.totalTestCasesOf = totalTestCasesOf;
		this.studentRecords = {};
		this.questionRecords = {};
		this.buildStudentRecordsTotalScore();
		this.buildStudentRecordsScores();
		this.buildQuestionRecordsTestCases();
		this.buildQuestionRecordsTotalPass();
		this.buildQuestionRecordsAverage();
		this.buildQuestionRecordsNoSubmission();
	}

	buildStudentRecordsTotalScore() {
		this.examinees.forEach(examinee => {
			this.studentRecords[examinee.id] = {};
			this.studentRecords[examinee.id].totalScore = this.studentTotalScore(examinee.id);
		});
	}

	buildStudentRecordsScores() {
		this.examinees.forEach(examinee => {
			if (!this.studentRecords[examinee.id]) {
				this.studentRecords[examinee.id] = {};
			}
			this.studentRecords[examinee.id].scores = this.studentScores(examinee.id);
		});
	}

	buildQuestionRecordsTestCases() {
		this.examQuestions.forEach(problem => {
			if (!this.questionRecords[problem.problemId]) {
				this.questionRecords[problem.problemId] = {};
			}
			this.questionRecords[problem.problemId].testCases = this.testCasesDataByOneProblemId(problem.problemId);
		});
	}

	buildQuestionRecordsTotalPass() {
		this.examQuestions.forEach(problem => {
			if (!this.questionRecords[problem.problemId]) {
				this.questionRecords[problem.problemId] = {};
			}
			this.questionRecords[problem.problemId].totalPass = this.totalPassDataByOneProblemId(problem.problemId);
		});
	}

	buildQuestionRecordsAverage() {
		this.examQuestions.forEach(problem => {
			if (!this.questionRecords[problem.problemId]) {
				this.questionRecords[problem.problemId] = {};
			}
			this.questionRecords[problem.problemId].average = this.questionAverageByOneProblemId(problem.problemId);
		});
	}

	buildQuestionRecordsNoSubmission() {
		this.examQuestions.forEach(question => {
			if (!this.questionRecords[question.problemId]) {
				this.questionRecords[question.problemId] = {};
			}
			this.questionRecords[question.problemId].noSubmission = this.countNoSubmissionByProblemId(question.problemId);
		});
	}

	studentTotalScore(studentId) {
		return this.submissionsByStudentId(studentId)
			.reduce((sum, submission) => sum + submission.verdict.totalGrade, 0);
	}

	studentScores(studentId) {
		const scores = Array(this.totalProblems).fill(0);
		const submissions = this.submissionsByStudentId(studentId);
		for (let i = 0; i < this.totalProblems; i++) {
			const find = submissions.filter(submission => submission.problemId === this.examQuestions[i].problemId);
			scores[i] = find.length > 0 ? find[0].verdict.totalGrade : 0;
		}
		return scores;
	}

	testCasesDataByOneProblemId(problemId) {
		const totalTestCases = this.totalTestCasesOf[problemId];
		const testCasesData = Array(totalTestCases).fill(0);
		this.submissionsByProblemId(problemId)
			.forEach(submission => submission.verdict.judges
				.forEach(judge => testCasesData[parseInt(judge.testcaseName)] += judge.grade === judge.maxGrade ? 1 : 0)
			);
		return testCasesData;
	}

	totalPassDataByOneProblemId(problemId) {
		const totalTestCases = this.totalTestCasesOf[problemId];
		const totalPassData = Array(totalTestCases + 1).fill(0);
		this.submissionsByProblemId(problemId)
			.forEach(submission => {
				let totalPass = submission.verdict.judges
					.reduce((sum, judge) => sum + (judge.grade === judge.maxGrade ? 1 : 0), 0);
				totalPassData[totalPass]++;
			});
		return totalPassData;
	}

	questionAverageByOneProblemId(problemId) {
		const sumOfGrades = this.submissionsByProblemId(problemId)
			.reduce((sum, submission) => sum + parseFloat(submission.verdict.totalGrade), 0);
		return parseFloat((sumOfGrades / this.totalExaminees).toFixed(2));
	}

	countNoSubmissionByProblemId(problemId) {
		return this.totalExaminees - this.submissionsByProblemId(problemId).length;
	}

	submissionsByProblemId(problemId) {
		return this.submissions.filter(submission => submission.problemId === problemId);
	}

	get totalExaminees() {
		return this.examinees.length;
	}

	get totalProblems() {
		return this.examQuestions.length;
	}

	get submissions() {
		return this.examTranscript.records.map(record => record.submission);
	}

	submissionsByStudentId(studentId) {
		return this.submissions.filter(submission => submission.studentId === studentId);
	}

	get crossAverage() {
		const sumOfStudentTotalScore = this.examinees.reduce((sum, e) => sum + this.studentTotalScore(e.id), 0);
		return parseFloat((sumOfStudentTotalScore / this.totalExaminees).toFixed(2));
	}

	get sumOfMaxScores() {
		return this.examQuestions.reduce((sum, q) => sum + q.maxScore, 0);
	}
}