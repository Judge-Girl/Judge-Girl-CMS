import axios from "axios";

export class ProblemService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async modifyProblemTitle(problemId, title) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, title})
    }

    async modifyProblemDescription(problemId, description) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, description})
    }

    async createProblem(problemTitle) {
        return this.axios.post(`/api/problems`, {problemTitle}).then(res => res.data)
    }

    async getAllProblems() {
        return this.axios.get(`/api/problems`).then(res => res.data)
    }
}
