export default class Submission {
  constructor({id, studentId, problemId, languageEnvName, verdict, submittedCodesFileId, submissionTime, bag, judged}) {
    this.id = id;
    this.studentId = studentId;
    this.problemId = problemId;
    this.languageEnvName = languageEnvName;
    this.verdict = verdict;
    this.submittedCodesFileId = submittedCodesFileId;
    this.submissionTime = submissionTime;
    this.bag = bag;
    this.judged = judged;
  }
}