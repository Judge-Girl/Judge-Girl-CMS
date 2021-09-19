
export default class Testcase {
    constructor({id, name, problemId, timeLimit, memoryLimit,
                    outputLimit, threadNumberLimit, grade, ioFileId, stdIn, stdOut,
                    inputFiles, outputFiles}) {
        this.id = id;
        this.name = name;
        this.problemId = problemId;
        this.timeLimit = timeLimit;
        this.memoryLimit = memoryLimit;
        this.outputLimit = outputLimit;
        this.threadNumberLimit = threadNumberLimit;
        this.grade = grade;
        this.ioFileId = ioFileId;
        this.stdIn = stdIn;
        this.stdOut = stdOut;
        this.inputFiles = inputFiles;
        this.outputFiles = outputFiles;
    }
}
