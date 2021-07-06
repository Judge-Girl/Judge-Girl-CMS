
export class ExamScoreboardPresenter {
    #examQuestions
    #crossAverage
    #sumOfMaxScores
    #totalExaminees
    #totalTestCasesOf
    #studentRecords
    #questionRecords

    constructor(examScoreboard) {
        this.#examQuestions = examScoreboard.examQuestions;
        this.#crossAverage = examScoreboard.crossAverage;
        this.#sumOfMaxScores = examScoreboard.sumOfMaxScores;
        this.#totalExaminees = examScoreboard.totalExaminees;
        this.#studentRecords = examScoreboard.studentRecords;
        this.#questionRecords = examScoreboard.questionRecords;
        this.#totalTestCasesOf = examScoreboard.totalTestCasesOf;
    }

    get crossAverage() {
        return this.#crossAverage;
    }

    get sumOfMaxScores() {
        return this.#sumOfMaxScores;
    }

    get totalExaminees() {
        return this.#totalExaminees;
    }

    get examSummary() {
        return this.#examQuestions.map(q => {
            const totalTestCases = this.#totalTestCasesOf[q.problemId];
            return {
                problemId: q.problemId,
                problemTitle: q.problemTitle,
                totalExaminees: this.totalExaminees,
                average: this.#questionRecords[q.problemId].average,
                chartData: {
                    testcasesData: this.#questionRecords[q.problemId].testCases,
                    testcasesLabels: [...Array(totalTestCases).keys()],
                    totalPassData: this.#questionRecords[q.problemId].totalPass,
                    totalPassLabels: [...Array(totalTestCases + 1).keys()],
                    noSubmission: this.#questionRecords[q.problemId].noSubmission
                }
            };
        })
    }
}