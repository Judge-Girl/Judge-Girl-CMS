import AbstractService from './AbstractService';
import Homework from '../models/Homework';

export class HomeworkService extends AbstractService {

  constructor(studentService) {
    super({
      baseURL: process.env.REACT_APP_ACADEMY_SVC_BASE_URL,
      timeout: 10000,
      tokenSupplier: studentService.currentToken
    });
  }

  async getHomeworkById(homeworkId) {
    return this.axios.get(`/api/homework/${homeworkId}`)
      .then(res => new Homework(res.data));
  }

  async getAllHomework() {
    return this.axios.get('/api/homework')
      .then(res => res.data.map(obj => new Homework(obj)));
  }

  async createHomework(name, problemIds) {
    return this.axios.post('/api/homework', {name, problemIds})
      .then(res => new Homework(res.data));
  }

  async deleteHomework(homeworkId) {
    return this.axios.delete(`/api/homework/${homeworkId}`);
  }
}
