import {ExamScoreboard} from "../model";
import AbstractService from "../../../services/AbstractService";


class ExamTranscriptService extends AbstractService {

    constructor(studentService, examService, problemService) {
        super({
            baseURL: process.env.REACT_APP_EXAM_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
        this.examService = examService;
        this.problemService = problemService;
    }

    getExamScoreboard(examId) {
        return Promise.all([
            this.examService.getExaminees(examId),
            this.examService.getExamOverview(examId),
            this.examService.getExamTranscript(examId),
        ]).then(async ([examinees, examOverview, examTranscript]) => {
            const totalTestCasesOf = {};
            const ids = examOverview.questions.map(question => question.problemId);
            await this.problemService.getProblemByIds(ids)
                .then(problems => problems
                    .forEach(problem => totalTestCasesOf[problem.id] = problem.testcases.length))
            return {examinees, examOverview, examTranscript, totalTestCasesOf}
        }).then(data => new ExamScoreboard({...data}));
    }
}

export {ExamTranscriptService}