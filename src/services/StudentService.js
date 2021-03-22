import axios from "axios";
import Student from "../models/Student";

export default class StudentService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_STUDENT_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async login(email, password) {
        return this.axios.post('/api/students/login', {email, password})
            .then(res => new Student(res.data))
    }
}
