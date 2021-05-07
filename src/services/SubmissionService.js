import axios from "axios";

export class SubmissionService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async submit(problem) {
        const {problemId, langEnvName, studentId} = problem
        return this.axios.post(`/api/problems/${problemId}/${langEnvName}/students/${studentId}/submissions`)
    }
}
