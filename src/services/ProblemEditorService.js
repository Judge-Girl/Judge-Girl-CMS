import axios from "axios";

export class ProblemEditorService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_EXAM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async modifyProblemTitle(problemId, title) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, title})
            .then()
    }

    async modifyProblemDescription(problemId, description) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, description})
            .then();
    }

}
