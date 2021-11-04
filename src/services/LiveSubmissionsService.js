import AbstractService from './AbstractService';
import LiveSubmissionEvent from '../models/LiveSubmissionEvent';
import VerdictIssuedEvent from '../models/VerdictIssuedEvent';
import {distinct} from '../utils/array';

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
    const queryParameters = {examId, sortBy: 'submissionTime', ascending: false};
    const liveSubmissions = await this.submissionService.getSubmissions(queryParameters)
      .then(submissions => submissions.map(submission => this.toLiveSubmission(submission)));
    return await this.completeLiveSubmissionsFields(liveSubmissions);
  }

  toLiveSubmission(submission) {
    let liveSubmissionEvent = new LiveSubmissionEvent(submission);
    liveSubmissionEvent.submissionId = submission.id;
    liveSubmissionEvent.verdict = submission.verdict;
    return liveSubmissionEvent;
  }

  subscribeToLiveSubmissionEvent(examId, subscriber) {
    return this.stompClient.subscribe(`/topic/exams/${examId}/submissions`,
      message => this.completeLiveSubmissionsFields([new LiveSubmissionEvent(JSON.parse(message.body))])
        .then(events => subscriber(events[0])));
  }

  async completeLiveSubmissionsFields(liveSubmissions) {
    const problemIds = distinct(liveSubmissions.map(liveSubmission => liveSubmission.problemId));
    const problems = await this.problemService.getProblemsByIds(problemIds);

    const studentIds = distinct(liveSubmissions.map(liveSubmission => liveSubmission.studentId));
    const students = await this.studentService.getStudentsByIds(studentIds);

    liveSubmissions.forEach(liveSubmission => {
      liveSubmission.problemTitle = problems.find(problem => problem.id === liveSubmission.problemId)?.title;
      liveSubmission.studentName = students.find(student => student.id === liveSubmission.studentId)?.name;
    });
    return liveSubmissions;
  }

  subscribeToVerdictIssuedEvent(examId, subscriber) {
    return this.stompClient.subscribe(`/topic/exams/${examId}/verdicts`,
      message => subscriber(new VerdictIssuedEvent(JSON.parse(message.body))));
  }

}