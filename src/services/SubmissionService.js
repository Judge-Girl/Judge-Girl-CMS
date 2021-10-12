import AbstractService from './AbstractService';
import Submission from '../models/Submission';

export class SubmissionService extends AbstractService {

  constructor(studentService) {
    super({
      baseURL: process.env.REACT_APP_SUBMISSION_SVC_BASE_URL,
      timeout: 10000,
      tokenSupplier: studentService.currentToken
    });
  }

  async getSubmissions({examId, sortBy, ascending}) {
    return this.axios.get(`/api/submissions?examId=${examId}&sortBy=${sortBy}&ascending=${ascending}`)
      .then(res => res.data.map(obj => new Submission(obj)));
  }

  async rejudge(/*{examId, problemId}*/) {
    return new Promise((res) => {
      setTimeout(() => {
        // TODO
        console.log('rejudge success.');
        res('SUCCESS');
      }, 2000);
    });
  }
}
