import AbstractService from "./AbstractService";

export class SubmissionService extends AbstractService {

    constructor(studentService) {
        super({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
    }

    async rejudge({examId, problemId}) {
        return new Promise((res) => {
            setTimeout(() => {
                // TODO
                console.log("rejudge success.");
                res("SUCCESS")
            }, 2000);
        })
    }
}
