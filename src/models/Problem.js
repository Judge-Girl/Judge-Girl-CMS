export default class Problem {
    constructor({id, title, description, languageEnvs, judgeMatchPolicyPluginTag,
                    judgeFilterPluginTags, tags, testcases, totalGrade, visible, archived}) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.languageEnvs = languageEnvs;
        this.judgeMatchPolicyPluginTag = judgeMatchPolicyPluginTag;
        this.judgeFilterPluginTags = judgeFilterPluginTags;
        this.tags = tags;
        this.testcases = testcases;
        this.totalGrade = totalGrade;
        this.visible = visible;
        this.archived = archived;
    }
}