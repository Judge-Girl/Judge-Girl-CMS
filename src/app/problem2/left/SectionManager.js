class SectionObject {
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }
}
const SECTIONS = [
    new SectionObject("Tags", "problem-editor-tags"),
    new SectionObject("Provided Code", "problem-editor-provided-code"),
    new SectionObject("Submitted Code Spec","problem-editor-submitted-code-spec"),
    new SectionObject("Resource Spec", "problem-editor-resource-spec"),
    new SectionObject("Compilation Script", "problem-editor-compilation-script"),
    new SectionObject("Output Match Policy", "problem-editor-output-match-policy"),
    new SectionObject("Visible", "problem-editor-visible"),
    new SectionObject("Description", "problem-editor-description"),
    new SectionObject("Test Cases", "problem-editor-testcases"),
    new SectionObject("Actions", "problem-editor-actions")
];


export {SECTIONS};