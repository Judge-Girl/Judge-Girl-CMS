

export class ExamScorePresenter {
    #examinees
    #examQuestions
    #crossAverage
    #sumOfMaxScores
    #studentRecords

    constructor(examScoreboard) {
        this.#examinees = examScoreboard.examinees;
        this.#examQuestions = examScoreboard.examQuestions;
        this.#crossAverage = examScoreboard.crossAverage;
        this.#sumOfMaxScores = examScoreboard.sumOfMaxScores;
        this.#studentRecords = examScoreboard.studentRecords;
    }

    get crossAverage() {
        return this.#crossAverage;
    }

    get totalExaminees() {
        return this.#examinees.length;
    }

    get sumOfMaxScores() {
        return this.#sumOfMaxScores;
    }

    get problemIds() {
        return this.#examQuestions.map(q => q.problemId);
    }

    get examQuestions() {
        return this.#examQuestions;
    }

    get examineeRecords() {
        return this.#examinees.map(examinee => ({
            studentName: examinee.name,
            studentScores: this.#studentRecords[examinee.id].scores,
            studentTotalScore: this.#studentRecords[examinee.id].totalScore
        }));
    }
}