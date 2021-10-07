export class LanguageEnv {

    constructor({language, compilation, resourceSpec, submittedCodeSpecs}) {
        this.language = language;
        this.compilation = compilation;
        this.resourceSpecCpu = resourceSpec.cpu;
        this.resourceSpecGpu = resourceSpec.gpu;
        this.submittedCodeSpecs = submittedCodeSpecs;
    }

    updateCompilationScript(script) {
        this.compilation.script = script;
    }

    getSubmittedCodeSpecFileNames() {
        return this.submittedCodeSpecs.map(codeSpec => codeSpec.fileName);
    }

    getResourceSpecCpu() {
        return this.resourceSpecCpu;
    }

    getResourceSpecGpu() {
        return this.resourceSpecGpu;
    }

    updateResourceSpecCpu(cpu) {
        this.resourceSpecCpu = cpu;
    }

    updateResourceSpecGpu(gpu) {
        this.resourceSpecGpu = gpu;
    }

    updateSubmittedCodeSpecs(fileNames) {
        this.submittedCodeSpecs = fileNames.map(fileName => {
            return {
                format: this.language,
                fileName: fileName
            }
        })
    }
}
