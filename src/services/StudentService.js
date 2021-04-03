import axios from "axios";
import Admin from "../models/Student";
import {Group} from "../models/Group";

export class YouAreNotAdminError extends Error {
}

export class AccountNotFoundError extends Error {
}

export class IncorrectPasswordError extends Error {
}

export class AuthenticationFailureError extends Error {

}

let currentAdmin = undefined;

const KEY_TOKEN = "token";

function updateCurrentAdmin(admin) {
    currentAdmin = admin;
    localStorage.setItem(KEY_TOKEN, currentAdmin.token);
    return currentAdmin;
}

function clearCurrentAdmin() {
    currentAdmin = null;
    localStorage.removeItem(KEY_TOKEN);
}

export default class StudentService {
    constructor() {
        this.axios = axios.create({
            baseURL: process.env.REACT_APP_STUDENT_SVC_BASE_URL,
            timeout: 10000
        });
    }

    async loginAsAdmin(email, password) {
        return this.axios.post('/api/admins/login', {email, password})
            .then(res => {
                return updateCurrentAdmin(new Admin(res.data));
            }).catch(err => {
                if (err.status === 404) {
                    throw new AccountNotFoundError(err.message);
                } else if (err.status === 400) {
                    throw new IncorrectPasswordError(err.message);
                } else if (err.status === 403) {
                    throw new YouAreNotAdminError(err.message);
                }
            });
    }

    async tryAuthWithLocalToken() {
        console.log("Try authenticating with local token...");
        const token = localStorage.getItem(KEY_TOKEN);
        return this.auth(token);
    }

    async auth(token) {
        return this.axios.post('/api/students/auth', null,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(res => {
                return updateCurrentAdmin(new Admin(res.data));
            })
            .catch(err => {
                throw new AuthenticationFailureError(err.message);
            });
    }

    async logout() {
        return new Promise(resolve => {
            clearCurrentAdmin();
            resolve();
        });
    }

    async getStudents({skip = 0, size = 50}) {
        return this.axios.get(`/api/students?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Admin(obj)));
    }

    async getAdmins({skip = 0, size = 50}) {
        return this.axios.get(`/api/admins?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Admin(obj)));
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
        return this.axios.post('/api/students', {name, email, password, isAdmin: false})
            .then(res => new Admin(res.data));
    }

    async createAdminAccount({name, email, password}) {
        return this.axios.post('/api/admins', {name, email, password, isAdmin: true})
            .then(res => new Admin(res.data));
    }
}

