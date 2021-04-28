import StudentService from "./StudentService";
import {ExamService} from "./ExamService";
import {ProblemEditorService} from "./ProblemEditorService";


const examService = new ExamService();
const studentService = new StudentService();
const problemEditorService = new ProblemEditorService();

export {examService, studentService, problemEditorService};
