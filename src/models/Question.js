export default class Question {
    constructor({examId, problemId, quota, maxScore, questionOrder}) {
        this.examId = examId;
        this.problemId = problemId;
        this.quota = quota;
        this.maxScore = maxScore;
        this.questionOrder = questionOrder;
    }
}
