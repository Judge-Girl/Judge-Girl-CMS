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

    async getStudents({skip, size}) {
        return this.axios.get(`/api/students?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Student(obj)));
    }

    async getAdmins() {
        return new Promise(resolve => {
            resolve([{
                id: 333,
                name: "admin",
                email: "adin@gmail.com"
            }]);
        });
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
        return this.axios.post('/api/students/signUp', {name, email, password, isAdmin: false})
            .then(res => new Student(res.data));
    }

    async createAdminAccount({name, email, password}) {
        return this.axios.post('/api/students/signUp', {name, email, password, isAdmin: true})
            .then(res => new Student(res.data));
    }
}
