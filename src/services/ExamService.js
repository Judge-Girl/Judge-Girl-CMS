import Exam from '../models/Exam';
import Student from '../models/Student';
import Question from '../models/Question';
import AbstractService from './AbstractService';

export const EXAM_STATUSES = {
  ALL: 'all', UPCOMING: 'upcoming', PAST: 'past', CURRENT: 'current'
};

export class ExamService extends AbstractService {

  constructor(studentService) {
    super({
      baseURL: process.env.REACT_APP_ACADEMY_SVC_BASE_URL,
      timeout: 10000,
      tokenSupplier: studentService.currentToken
    });
  }

  async getExam(examId) {
    return this.axios.get(`/api/exams/${examId}`)
      .then(res => new Exam(res.data));
  }

  async getExamOverview(examId) {
    return this.axios.get(`/api/exams/${examId}/overview`)
      .then(res => new Exam(res.data));
  }

  async getExamTranscript(examId) {
    return this.axios.get(`/api/exams/${examId}/transcript`)
      .then(res => res.data);
  }

  async getExamTranscriptCsvFile(examId) {
    return this.axios.get(`/api/exams/${examId}/transcript/csv`, {responseType: 'blob'});
  }

  async getExams({status, skip = 0, size = 50}) {
    return this.axios.get(`/api/exams?status=${status}&&skip=${skip}&&size=${size}`)
      .then(res => res.data.map(obj => new Exam(obj)));
  }

  async createExam({name, description, startTime, endTime}) {
    description = description ? description : `# ${name}`;
    return this.axios.post('/api/exams', {name, description, startTime, endTime})
      .then(res => new Exam(res.data));
  }

  async deleteExam(examId) {
    return this.axios.delete(`/api/exams/${examId}`);
  }

  async getExaminees(examId) {
    return this.axios.get(`/api/exams/${examId}/students`)
      .then(res => res.data.map(obj => new Student(obj)));
  }

  async addExaminees(examId, emails) {
    const emailList = emails.split('\n');
    return this.axios.post(`/api/exams/${examId}/students`, emailList)
      .then(res => res.data);
  }

  async addGroupsOfExaminees(examId, groupNames) {
    const names = groupNames.split('\n');
    return this.axios.post(`/api/exams/${examId}/groups`, {examId, names});
  }

  async deleteExaminees(examId, emails) {
    const emailList = emails.split('\n');
    return this.axios.delete(`/api/exams/${examId}/students`, {data: emailList})
      .then(res => res.data);
  }

  async addExamQuestion(question) {
    const {examId, problemId} = question;
    return this.axios.post(`/api/exams/${examId}/problems/${problemId}`, question).then(res => new Question(res.data));
  }

  async editExamQuestion(question) {
    const {examId, problemId} = question;
    return this.axios.put(`/api/exams/${examId}/problems/${problemId}`, question).then(res => new Question(res.data));
  }

  async reorderQuestions(examId, reorders) {
    return this.axios.patch(`/api/exams/${examId}/problems/reorder`, {examId, reorders});
  }

  async deleteExamQuestion({examId, problemId}) {
    return this.axios.delete(`/api/exams/${examId}/problems/${problemId}`);
  }

  async updateExam(examId, data) {
    return this.axios.put(`/api/exams/${examId}`, data)
      .then(res => new Exam(res.data));
  }
}
