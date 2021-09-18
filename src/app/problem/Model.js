export class LanguageEnv {

    constructor({language, compilation, resourceSpec, submittedCodeSpecs}) {
        this.language = language;
        this.compilationScript = compilation.script;
        this.resourceSpecCpu = resourceSpec.cpu;
        this.resourceSpecGpu = resourceSpec.gpu;
        this.submittedCodeSpecs = submittedCodeSpecs;
    }

    getSubmittedCodeSpecFileNames() {
        return this.submittedCodeSpecs.map(codeSpec => codeSpec.fileName);
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