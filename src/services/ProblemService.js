import AbstractService from "./AbstractService";
import Problem from "../models/Problem";

export class ProblemService extends AbstractService {

    constructor(studentService) {
        super({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
    }

    async modifyProblemTitle(problemId, title) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, title});
    }

    async modifyProblemDescription(problemId, description) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, description});
    }

    async modifyProblemVisible(problemId, visible) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, visible});
    }

    async getProblemById(problemId) {
        return this.axios.get(`/api/problems/${problemId}`)
            .then(res => new Problem(res.data));
    }

    async getProblemsByIds(problemIds) {
        return this.axios.get(`/api/problems?ids=${problemIds.join(',')}`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async createProblem(problemTitle) {
        return this.axios.post(`/api/problems`, problemTitle,
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(res => res.data);
    }

    async getAllProblems() {
        return this.axios.get(`/api/problems`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async archiveOrDeleteProblem(problemId) {
        return this.axios.delete(`/api/problems/${problemId}`);
    }

    async restoreProblem(problemId) {
        return this.axios.patch(`/api/problems/${problemId}/restore`);
    }
}
