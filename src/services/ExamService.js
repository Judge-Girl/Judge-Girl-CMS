import Exam from "../models/exam";

export default class ExamService {

    async getExams() {
        const stub = new Exam({
            id: 1,
            name: "OOP",
            description: "OOP's Final",
            startTime: 1617129244544,
            endTime: 1618129244544
        });
        return new Promise(function(resolve) {
            resolve([stub, stub, stub, stub]);
        });
    }
}
