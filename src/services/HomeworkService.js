import AbstractService from "./AbstractService";
import Homework from "../models/Homework";

export class HomeworkService extends AbstractService {

    constructor(studentService) {
        super({
            baseURL: process.env.REACT_APP_HOMEWORK_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
    }

    async getHomework(homeworkId) {
        return this.axios.get(`/api/homework/${homeworkId}`)
            .then(res => new Homework(res.data));
    }

    async getAllHomework() {
        return this.axios.get(`/api/homework`)
            .then(res => res.data.map(obj => new Homework(obj)));
    }

    async createHomework({name, problemIds}) {
        return this.axios.post('/api/homework', new Homework({name, problemIds}))
            .then(res => new Homework(res.data));
    }

    async deleteEHomework(homeworkId) {
        return this.axios.delete(`/api/homework/${homeworkId}`)
            .then(res => res);
    }
}