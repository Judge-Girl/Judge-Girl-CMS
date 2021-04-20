import Exam from "../models/Exam";
import axios from "axios";

export const EXAM_STATUSES = {
    ALL: 'all', UPCOMING: 'upcoming', PAST: 'past', CURRENT: 'current'
};

export class ExamService {

    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_EXAM_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async getExam(examId) {
        return this.axios.get(`/api/exams/${examId}`)
            .then(res => new Exam(res.data));
    }

    async getExams({status, skip = 0, size = 50}) {
        return this.axios.get(`/api/exams?status=${status}&&skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Exam(obj)));
    }

    async createExam({name, description, startTime, endTime}) {
        description = description ? description : `# ${name}`;
        return this.axios.post('/api/exams', {name, description, startTime, endTime})
            .then(res => new Exam(res.data));
    }

    async addExaminees(examId, emails) {
        return this.axios.post(`/api/exams/${examId}/students`, {emails})
            .then(res => res.data);
    }

    // async deleteExaminees(examId, emails) {
    //     return this.axios.delete(`/api/exams/${examId}/students`, {emails})
    //         .then(res => res.data);
    // }
}
