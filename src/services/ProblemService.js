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

    async updateProblemVisibility(problemId, visible) {
        return this.axios.patch(`/api/problems/${problemId}`, {problemId, visible});
    }

    async updateLanguageEnv(problemId, languageEnv) {
        const language = languageEnv.language;
        const compilationScript = languageEnv.compilation.script;
        const resourceSpecCpu = languageEnv.resourceSpec.cpu;
        const resourceSpecGpu = languageEnv.resourceSpec.gpu;
        const submittedCodeSpecs = languageEnv.submittedCodeSpecs;
        return this.axios.put(`/api/problems/${problemId}/langEnv/${language}`,
            {language, compilationScript, resourceSpecCpu, resourceSpecGpu, submittedCodeSpecs})
            .catch(e => {
                throw new Error(e.response.data)
            });
    }

    async getProblemById(problemId) {
        const response = await this.axios.get(`/api/problems/${problemId}`);
        const problem = new Problem(response.data);

        return new Promise((resolve) => {
            if (!problem.languageEnvs || problem.languageEnvs.length === 0 ||
                problem.languageEnvs[0].name.toUpperCase() !== 'C') {
                problem.languageEnvs = [{
                    name: "C",
                    language: "C",
                    compilation: {
                        script: "gcc -std=c99 -O2 a.c -lm"
                    },
                    resourceSpec: {
                        cpu: 1.0,
                        gpu: 0.0,
                    },
                    submittedCodeSpecs: []
                }];
                console.log(`The problem(id=${problemId}) doesn't have the default C language, let's initialize one for it...`)
                this.updateLanguageEnv(problemId, problem.languageEnvs[0])
                    .then(() => resolve(problem));
            } else {
                resolve(problem);
            }
        });
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
        return this.axios.patch(`/api/problems/${problemId}/restore`)
            .catch(e => {
                throw new Error(e.response.data)
            });  // TODO: maybe axios supports response filtering?
    }

    async saveTestcase(testcase) {
        return this.axios.put(`/api/problems/${testcase.problemId}/testcases/${testcase.id}`, testcase)
            .catch(e => {
                throw new Error(e.response.data)
            });
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

    deleteTestcase(problemId, testcaseId) {
        return this.axios.delete(`/api/problems/${problemId}/testcases/${testcaseId}`)
            .then(res => res.data);
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
