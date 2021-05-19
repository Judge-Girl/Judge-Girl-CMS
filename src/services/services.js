import StudentService from "./StudentService";
import {ExamService} from "./ExamService";
import {ProblemService} from "./ProblemService";
import {SubmissionService} from "./SubmissionService";


const studentService = new StudentService();
const examService = new ExamService(studentService);
const problemService = new ProblemService(studentService);
const submissionService = new SubmissionService(studentService);

export {examService, studentService, problemService, submissionService};
