import AbstractService from "./AbstractService";
import LiveSubmissionEvent from "../models/LiveSubmissionEvent";
import VerdictIssuedEvent from "../models/VerdictIssuedEvent";

export class LiveSubmissionsService extends AbstractService {

    constructor(studentService, problemService, submissionService, stompClient) {
        super({
            baseURL: process.env.REACT_APP_SUBMISSION_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
        this.studentService = studentService;
        this.problemService = problemService;
        this.submissionService = submissionService;
        this.stompClient = stompClient;
    }

    async queryLatestExamSubmissions(examId) {
        let queryParameters = {examId, sortBy: 'submissionTime', ascending: false};
        const liveSubmissions = await this.submissionService.getSubmissions(queryParameters)
            .then(submissions => submissions.map(submission => this.toLiveSubmission(submission)));
        return Promise.all(liveSubmissions.map(liveSubmission => this.completeLiveSubmissionFields(liveSubmission)));
    }

    toLiveSubmission(submission) {
        let liveSubmissionEvent = new LiveSubmissionEvent(submission);
        liveSubmissionEvent.submissionId = submission.id;
        liveSubmissionEvent.verdict = submission.verdict;
        return liveSubmissionEvent;
    }

    subscribeToLiveSubmissionEvent(examId, subscriber) {
        return this.stompClient.subscribe(`/topic/exams/${examId}/submissions`,
            message => this.completeLiveSubmissionFields(new LiveSubmissionEvent(JSON.parse(message.body)))
                .then(event => subscriber(event)));
    }

    async completeLiveSubmissionFields(liveSubmissionEvent) {
        liveSubmissionEvent.problemTitle = (await this.problemService.getProblemById(liveSubmissionEvent.problemId)).title;
        liveSubmissionEvent.studentName = (await this.studentService.getStudentById(liveSubmissionEvent.studentId)).name;
        return Promise.resolve(liveSubmissionEvent);
    }

    subscribeToVerdictIssuedEvent(examId, subscriber) {
        return this.stompClient.subscribe(`/topic/exams/${examId}/verdicts`,
            message => subscriber(new VerdictIssuedEvent(JSON.parse(message.body))));
    }

}