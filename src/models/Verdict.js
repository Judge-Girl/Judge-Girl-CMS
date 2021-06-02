export default class Verdict {
    constructor({ judges, summaryStatus, totalGrade, maxGrade, compileErrorMessage, maximumRuntime, maximumMemoryUsage, report, issueTime }) {
        this.judges = judges;
        this.summaryStatus = summaryStatus;
        this.totalGrade = totalGrade;
        this.maxGrade = maxGrade;
        this.compileErrorMessage = compileErrorMessage;
        this.maximumRuntime = maximumRuntime;
        this.maximumMemoryUsage = maximumMemoryUsage;
        this.report = report;
        this.issueTime = issueTime;
    }
}

export class Judge {
    constructor({ testcaseName, status, programProfile, grade, maxGrade }) {
        this.testcaseName = testcaseName;
        this.status = status;
        this.programProfile = programProfile;
        this.grade = grade;
        this.maxGrade = maxGrade;
    }
}

export class ProgramProfile {
    constructor({ runtime, memoryUsage, errorMessage }) {
        this.runtime = runtime;
        this.memoryUsage = memoryUsage;
        this.errorMessage = errorMessage;
    }
}

export class Report {
    constructor({ name, rawData }) {
        this.name = name;
        this.rawData = rawData;
    }
}
