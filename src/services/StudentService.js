import axios from "axios";
import Student from "../models/Student";
import {Group} from "../models/Group";

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

    async getStudents({skip = 0, size = 50}) {
        return this.axios.get(`/api/students?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Student(obj)));
    }

    async getAdmins({skip = 0, size = 50}) {
        return this.axios.get(`/api/admins?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Student(obj)));
    }


    async getGroups() {
        return this.axios.get('/api/groups')
            .then(res => res.data.map(obj => new Group(obj)));
    }

    async createGroupWithName(name) {
        return this.axios.post('/api/groups', {name})
            .then(res => new Group(res.data));
    }

    async createStudentAccount({name, email, password}) {
        // TODO: wait backend to be changed to '/api/students'
        return this.axios.post('/api/students/signUp', {name, email, password, isAdmin: false})
            .then(res => new Student(res.data));
    }

    async createAdminAccount({name, email, password}) {
        return this.axios.post('/api/admins', {name, email, password, isAdmin: true})
            .then(res => new Student(res.data));
    }
}
