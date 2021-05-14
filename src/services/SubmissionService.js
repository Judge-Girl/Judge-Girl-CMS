import axios from "axios";

export class SubmissionService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async rejudge({examId, problemId}) {
        return new Promise((res) => {
            setTimeout(() => {
                console.log("rejudge success.")
                res("SUCCESS")
            }, 2000);
        })
    }
}
