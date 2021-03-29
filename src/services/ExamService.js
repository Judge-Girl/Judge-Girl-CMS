import Exam from "../models/Exam";
import axios from "axios";

export default class ExamService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_EXAM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async getExams({status, skip, size}) {
        return this.axios.get(`/api/exams?status=${status}&&skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Exam(obj)));
    }

    async createExam({name, description, startTime, endTime}) {
        return this.axios.post('/api/exams',  {name, description, startTime, endTime})
            .then(res => new Exam(res.data));
    }
}
