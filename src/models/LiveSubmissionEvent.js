export default class LiveSubmissionEvent {
    constructor({ problemId, languageEnvName, studentId, submissionId, submissionTime, submissionBag }) {
        this.problemId = problemId;
        this.languageEnvName = languageEnvName;
        this.studentId = studentId;
        this.submissionId = submissionId;
        this.submissionTime = submissionTime;
        this.submissionBag = submissionBag;
    }
}