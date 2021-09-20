import "./CompilationScript.scss"
import Block from "./Block";
import {useEffect, useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {EditorButton} from "../../commons/EditorButton";
import {useParams} from "react-router-dom";
import {problemService} from "../../../../services/services";
import {LanguageEnv} from "../../Model";


const CompilationScript = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const [languageEnv, setLanguageEnv] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [script, setScript] = useState("");
    const [scriptBackUp, setScriptBackUp] = useState(undefined);

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(p => {
                    setProblem(p);
                    setLanguageEnv(new LanguageEnv(p.languageEnvs[0]));
                });
        }
        if (languageEnv) {
            setScript(languageEnv.getCompilationScript());
        }
    }, [languageEnv, problem, problemId]);

    const onClickEdit = () => {
        setIsEditing(true);
        setScriptBackUp(script);
    };

    const onClickSave = () => {
        setIsEditing(false);
        languageEnv.updateCompilationScript(script)
        problemService.updateLanguageEnv(problemId, languageEnv)
            .then(() => {
                console.log("The problem's compilation script has been updated");
            });
    };

    const onClickCancel = () => {
        setIsEditing(false);
        setScript(scriptBackUp)
    };

    return <>
        <Block title="Compilation Script"
               id="problem-editor-compilation-script"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>

            <div className={"compilation-script"}>
                {!isEditing ?
                    <div>{script}</div>
                    :
                    <>
                        <textarea className="compile-script-text-area"
                                  placeholder="gcc a.out -o main.c"
                                  value={script}
                                  onChange={e => setScript(e.target.value)}/>
                        <EditorButton text="Auto Generate"
                                      type="file"
                                      buttonColor="rgba(236, 112, 99, 1)"
                                      fontSize="16px"
                                      fontColor="#fff"
                                      width="11em"
                                      height="36px"
                                      borderRadius="50px"
                                      onClick={undefined}/>
                    </>}
            </div>
        </Block>
    </>;
};

export default CompilationScript;
