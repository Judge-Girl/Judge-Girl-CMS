
export default class Exam {
  constructor({ examId, problemId, quota, score, questionOrder }) {
    this.examId = examId;
    this.problemId = problemId;
    this.quota = quota;
    this.score = score;
    this.questionOrder = questionOrder;
  }
}
