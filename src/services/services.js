import StudentService from "./StudentService";
import {ExamService} from "./ExamService";
import {ProblemService} from "./ProblemService";
import {SubmissionService} from "./SubmissionService";


const examService = new ExamService();
const studentService = new StudentService();
const problemService = new ProblemService();
const submissionService = new SubmissionService();

export {examService, studentService, problemService, submissionService};
