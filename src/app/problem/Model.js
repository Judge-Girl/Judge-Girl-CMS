import {Tag} from "../usecases/TagUseCase";

export class LanguageEnv {

    constructor({language, compilation, resourceSpec, submittedCodeSpecs}) {
        this.language = language;
        this.compilationScript = compilation.script;
        this.resourceSpecCpu = resourceSpec.cpu;
        this.resourceSpecGpu = resourceSpec.gpu;
        this.submittedCodeSpecs = submittedCodeSpecs;
    }

    getSubmittedCodeSpecFileNameTags() {
        return this.submittedCodeSpecs.map(codeSpec => new Tag(codeSpec.fileName));
    }

    updateSubmittedCodeSpecs(fileNameTags) {
        this.submittedCodeSpecs = fileNameTags.map(tag => {
            return {
                format: this.language,
                fileName: tag.name
            }
        })
    }
}
