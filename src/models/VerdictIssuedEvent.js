export default class VerdictIssuedEvent {
  constructor({problemId, problemTitle, studentId, submissionId, verdict, submissionTime, submissionBag}) {
    this.problemId = problemId;
    this.problemTitle = problemTitle;
    this.studentId = studentId;
    this.submissionId = submissionId;
    this.verdict = verdict;
    this.submissionTime = submissionTime;
    this.submissionBag = submissionBag;
  }
}