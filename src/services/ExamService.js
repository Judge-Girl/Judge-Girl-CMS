import Exam from "../models/exam";

export default class ExamService {

    constructor() {
        const stub = new Exam({
            name: "OOP",
            description: "OOP's Final",
            startTime: 1617129244544,
            endTime: 1618129244544
        });
        this.exams = [{...stub, id: 1}, {...stub, id: 2}, {...stub, id: 3}, {...stub, id: 4}];
    }

    async getExams() {
        const response = this.exams;
        return new Promise(function (resolve) {
            resolve(response);
        });
    }

    async createExam({name, startTime, endTime}) {
        console.info(`Create an exam...`);
        const exams = this.exams;
        return new Promise(function (resolve) {
            resolve(new Exam({id: exams.length + 1,
                name, startTime, endTime}));
        });
    }
}
