import StudentService from "./StudentService";
import {ExamService} from "./ExamService";
import {ProblemService} from "./ProblemService";
import {SubmissionService} from "./SubmissionService";
import {LiveSubmissionsService} from "./LiveSubmissionsService";
import StompClient from "./StompClient";
import {HomeworkService} from "./HomeworkService";

const stompClient = new StompClient();
const studentService = new StudentService();
const examService = new ExamService(studentService);
const problemService = new ProblemService(studentService);
const submissionService = new SubmissionService(studentService);
const liveSubmissionsService = new LiveSubmissionsService(studentService, problemService, stompClient);
const homeworkService = new HomeworkService(studentService);

stompClient.connect();
export {examService, studentService, problemService, submissionService, liveSubmissionsService, homeworkService};
