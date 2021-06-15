import AbstractService from "./AbstractService";

export class LiveSubmissionsService extends AbstractService {

    constructor(studentService, stompClient) {
        super({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
        this.stompClient = stompClient;
    }

    subscribeToSubmitCompletion(examId, submitSubscriber) {
        console.log(`Subscribe to submitCompletion (examId=${examId}).`);
        return this.stompClient.subscribe(`/topic/exams/${examId}/submissions`, submitSubscriber);
    }

    subscribeToVerdictCompletion(examId, verdictSubscriber) {
        console.log(`Subscribe to verdictCompletion (examId=${examId}).`);
        return this.stompClient.subscribe(`/topic/exams/${examId}/verdicts`, verdictSubscriber);
    }

}