import StudentService from "./StudentService";
import {ExamService} from "./ExamService";
import {ProblemService} from "./ProblemService";


const examService = new ExamService();
const studentService = new StudentService();
const problemService = new ProblemService();

export {examService, studentService, problemService};
