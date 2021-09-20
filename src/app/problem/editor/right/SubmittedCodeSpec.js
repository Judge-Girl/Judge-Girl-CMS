import Block from "./Block";
import {useEffect, useState} from "react";
import {TextItem, useTextItems} from "../../../usecases/TextItemUseCase";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {FixedTextInputField} from "../../../commons/TextInputForm/FixedTextInputField";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems.js";
import {AiOutlinePaperClip} from "react-icons/all";
import {problemService} from "../../../../services/services";
import {LanguageEnv} from "../../Model";
import {useParams} from "react-router-dom";


const SubmittedCodeSpec = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const [languageEnv, setLanguageEnv] = useState(undefined);
    const [isEditing, setIsEditing] = useState(false);
    const [textItemBackUp, setTextItemBackUp] = useState(undefined);
    const {textItems, setTextItems, addTextItem, removeTextItem, updateTextItem} = useTextItems();

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(p => {
                    setProblem(p);
                    setLanguageEnv(new LanguageEnv(p.languageEnvs[0]));
                });
        }
        if (languageEnv) {
            setTextItems(languageEnv.getSubmittedCodeSpecFileNames().map(name => new TextItem(name)));
        }
    }, [languageEnv, problem, problemId, setTextItems]);

    const onClickEdit = () => {
        setIsEditing(true);
        setTextItemBackUp(textItems);
    };

    const onClickSave = () => {
        setIsEditing(false);
        languageEnv.updateSubmittedCodeSpecs(textItems.map(item => item.text));
        problemService.updateLanguageEnv(problemId, languageEnv)
            .then(() => {
                console.log("The problem's SubmittedCodeSpec has been updated");
            });
    };

    const onClickCancel = () => {
        setIsEditing(false);
        updateTextItem(textItemBackUp);
    };

    return <>
        <Block title="Submitted Code Spec"
               id="problem-editor-submitted-code-spec"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing ?
                <IconTextItems icon={<AiOutlinePaperClip/>}
                               items={textItems.map(item => item.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add Submitted Code File Name"} onSubmit={addTextItem}
                                    style={{width: "250px"}}/>
                    <FixedTextInputField items={textItems} removeItem={removeTextItem} iconSize={15}/>
                </>
            }
        </Block>
    </>;
};

export default SubmittedCodeSpec;
