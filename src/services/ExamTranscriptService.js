import {ExamScoreboard} from '../app/exam/model';
import AbstractService from './AbstractService';


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

  pollingExamScoreboard(examId, next) {
    console.info('Subscribe the polling of exam\'s scoreboard.');
    this.getExamScoreboard(examId).then(next); // the first call without delay
    const id = setInterval(() => {
      this.getExamScoreboard(examId).then(next);
    }, 3000, 8000);
    return {
      unsubscribe: () => {
        console.info('Unsubscribe the polling of exam\'s scoreboard.');
        clearInterval(id);
      }
    };
  }

  getExamScoreboard(examId) {
    return Promise.all([
      this.examService.getExaminees(examId),
      this.examService.getExamOverview(examId),
      this.examService.getExamTranscript(examId),
    ]).then(async ([examinees, examOverview, examTranscript]) => {
      const totalTestCasesOf = {};
      examOverview.questions = examOverview.questions.filter(problem => !problem.notFound);
      const ids = examOverview.questions.map(question => question.problemId);
      await this.problemService.getProblemsByIds(ids)
        .then(problems => problems
          .forEach(problem => totalTestCasesOf[problem.id] = problem.testcases.length));
          return {examinees, examOverview, examTranscript, totalTestCasesOf};
        }).then(data => new ExamScoreboard({...data}));
      }
    }
    
    export {ExamTranscriptService};
