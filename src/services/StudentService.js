import axios from "axios";
import Student from "../models/Student";
import {Group} from "../models/Group";
import AbstractService from "./AbstractService";

export class YouAreNotAdminError extends Error {
}

export class AccountNotFoundError extends Error {
}

export class IncorrectPasswordError extends Error {
}

export class AuthenticationFailureError extends Error {

}

let currentAdmin = undefined;

export const KEY_TOKEN = "token";

function updateCurrentAdmin(admin) {
    currentAdmin = admin;
    localStorage.setItem(KEY_TOKEN, currentAdmin.token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${currentAdmin.token}`;
    return currentAdmin;
}

function clearCurrentAdmin() {
    currentAdmin = null;
    localStorage.removeItem(KEY_TOKEN);
}


export default class StudentService extends AbstractService {
    constructor() {
        super({
            baseURL: process.env.REACT_APP_STUDENT_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: () => currentAdmin?.token
        });
    }

    async loginAsAdmin(email, password) {
        return this.axios.post('/api/admins/login', {email, password})
            .then(res => {
                return updateCurrentAdmin(new Student(res.data));
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
                return updateCurrentAdmin(new Student(res.data));
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

    async getStudentById(studentId) {
        return this.axios.get(`/api/students/${studentId}`)
            .then(res => new Student(res.data));
    }

    async getStudents({skip = 0, size = 50}) {
        return this.axios.get(`/api/students?skip=${skip}&&size=${size}`)
            .then(res => res.data.map(obj => new Student(obj)));
    }

    async getStudentsByIds(studentIds) {
        return this.axios.get(`/api/students?ids=${studentIds.join(',')}`)
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

    async getGroupById(groupId) {
        return this.axios.get(`/api/groups/${groupId}`)
            .then(res => new Group(res.data));
    }

    async deleteStudentById(studentId) {
        return this.axios.delete(`/api/students/${studentId}`)
    }

    async deleteGroupById(groupId) {
        return this.axios.delete(`/api/groups/${groupId}`);
    }

    async getMembersInGroup(groupId) {
        return this.axios.get(`/api/groups/${groupId}/members`)
            .then(res => res.data.map(obj => new Student(obj)));
    }

    async addMembersInToGroupByEmails(groupId, emails) {
        var emailList = emails.split("\n");
        return this.axios.post(`/api/groups/${groupId}/members`, emailList)
            .then(res => res.data);
    }

    async deleteMembersFromGroup(groupId, ids) {
        return this.axios.delete(`/api/groups/${groupId}/members?ids=${ids}`);
    }

    async createGroupWithName(name) {
        return this.axios.post('/api/groups', {name})
            .then(res => new Group(res.data));
    }

    async createStudentAccount({name, email, password}) {
        return this.axios.post('/api/students', {name, email, password, isAdmin: false})
            .then(res => new Student(res.data));
    }

    async createAdminAccount({name, email, password}) {
        return this.axios.post('/api/admins', {name, email, password, isAdmin: true})
            .then(res => new Student(res.data));
    }

    currentToken() {
        return currentAdmin.token;
    }
}

