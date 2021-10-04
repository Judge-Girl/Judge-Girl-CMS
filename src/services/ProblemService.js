import AbstractService from "./AbstractService";
import Problem from "../models/Problem";

export class ProblemService extends AbstractService {

    constructor(studentService) {
        super({
            baseURL: process.env.REACT_APP_PROBLEM_SVC_BASE_URL,
            timeout: 10000,
            tokenSupplier: studentService.currentToken
        });
    }

    async updateProblemTitle(problemId, title) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, title});
    }

    async updateProblemTags(problemId, tags) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, tags});
    }

    async updateProblemDescription(problemId, description) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, description});
    }

    async updateProblemVisible(problemId, visible) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, visible});
    }

    async updateLanguageEnv(problemId, languageEnv) {
        const language = languageEnv.language;
        const compilationScript = languageEnv.compilationScript;
        const resourceSpecCpu = languageEnv.resourceSpecCpu;
        const resourceSpecGpu = languageEnv.resourceSpecGpu;
        const submittedCodeSpecs = languageEnv.submittedCodeSpecs;
        return this.axios.put(`/api/problems/${problemId}/langEnv/${language}`,
            {language, compilationScript, resourceSpecCpu, resourceSpecGpu, submittedCodeSpecs});
    }

    async getProblemById(problemId) {
        return this.axios.get(`/api/problems/${problemId}`)
            .then(res => new Problem(res.data));
    }

    async getProblemsByIds(problemIds) {
        return this.axios.get(`/api/problems?ids=${problemIds.join(',')}`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async createProblem(problemTitle) {
        return this.axios.post(`/api/problems`, problemTitle,
            {
                headers: {
                    'Content-Type': 'text/plain'
                }
            }).then(res => res.data);
    }

    async getAllProblems() {
        return this.axios.get(`/api/problems`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async getNonArchivedAndVisibleProblems() {
        return this.axios.get(`/api/problems?invisible=false&archive=false`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async getNonArchivedAndInvisibleProblems() {
        return this.axios.get(`/api/problems?visible=false&archive=false`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async getArchiveProblems() {
        return this.axios.get(`/api/problems?archive=true`)
            .then(res => res.data.map(obj => new Problem(obj)));
    }

    async archiveOrDeleteProblem(problemId) {
        return this.axios.delete(`/api/problems/${problemId}`);
    }

    async restoreProblem(problemId) {
        return this.axios.patch(`/api/problems/${problemId}/restore`);
    }

    async upsertTestcase(testcase) {
        return this.axios.put(`/api/problems/${testcase.problemId}/testcases/${testcase.id}`, testcase);
    }

    /**
     * @param {TestcaseIOsPatch} patch
     */
    patchTestcaseIOs(patch) {
        let formData = new FormData();
        if (patch.deletedIns.length > 0) {
            formData.append("testcaseIOs.inFiles.delete", patch.deletedIns.join(','));
        }
        if (patch.deletedOuts.length > 0) {
            formData.append("testcaseIOs.outFiles.delete", patch.deletedOuts.join(','));
        }
        patch.inFiles.forEach(inFile => formData.append("testcaseIOs.inFiles", inFile));
        patch.outFiles.forEach(outFile => formData.append("testcaseIOs.outFiles", outFile));

        if (patch.stdInFile) {
            formData.append("testcaseIOs.stdIn", patch.stdInFile);
        }
        if (patch.stdOutFile) {
            formData.append("testcaseIOs.stdOut", patch.stdOutFile);
        }

        return this.axios.patch(`/api/problems/${patch.problemId}/testcases/${patch.testcaseId}/io`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => res.data);
    }
}

export class TestcaseIOsPatch {
    /**
     * @param {number} problemId
     * @param {String} testcaseId
     * @param {String[]} deletedIns
     * @param {String[]} deletedOuts
     * @param {File?} stdInFile
     * @param {File?} stdOutFile
     * @param {File[]} inFiles
     * @param {File[]} outFiles
     */
    constructor({problemId, testcaseId, deletedIns = [], deletedOuts = [],
                    stdInFile, stdOutFile, inFiles = [], outFiles = []}) {
        this.problemId = problemId;
        this.testcaseId = testcaseId;
        this.deletedIns = deletedIns;
        this.deletedOuts = deletedOuts;
        this.stdInFile = stdInFile;
        this.stdOutFile = stdOutFile;
        this.inFiles = inFiles;
        this.outFiles = outFiles;
    }

    isEmpty() {
        return this.deletedIns.length === 0 && this.deletedOuts.length === 0
        && !this.stdInFile && !this.stdOutFile && this.inFiles.length === 0 && this.outFiles.length === 0;
    }
}
