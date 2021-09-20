import Block from "./Block";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import {TextInputField} from "../../../commons/TextInputForm/TextInputField";
import {FixedTextInputField} from "../../../commons/TextInputForm/FixedTextInputField";
import IconTextItems from "../../../commons/TextInputForm/IconTextItems.js";
import {TextItem, useTextItems} from "../../../usecases/TextItemUseCase";
import {BsTag} from "react-icons/all";
import {problemService} from "../../../../services/services";
import {useProblemEditorContext} from "../ProblemEditorContext";


const Tags = () => {
    const {problemId} = useParams();
    const [problem, setProblem] = useState(undefined);
    const {markProblemsDirty} = useProblemEditorContext();
    const [isEditing, setIsEditing] = useState(false);
    const [textItemsBackUp, setTextItemsBackUp] = useState(undefined);
    const {textItems, setTextItems, addTextItem, removeTextItem} = useTextItems();

    useEffect(() => {
        if (!problem) {
            problemService.getProblemById(problemId)
                .then(p => {
                    setProblem(p);
                    setTextItems(p.tags.map(tag => new TextItem(tag)))
                });
        }
    }, [problem, problemId, setTextItems]);

    const onClickEdit = () => {
        setTextItemsBackUp(textItems);
        setIsEditing(true);
    };

    const onClickSave = () => {
        setIsEditing(false);
        problemService.updateProblemTags(problemId, textItems.map(item => item.text))
            .then(() => {
                console.log("The problem's tags has been modified");
                markProblemsDirty();
            });
    };

    const onClickCancel = () => {
        setIsEditing(false);
        setTextItems(textItemsBackUp);
    };

    return <>
        <Block title="Tags"
               id="problem-editor-tags"
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing ?
                <IconTextItems icon={<BsTag size={21}/>}
                               items={textItems.map(item => item.text)}/>
                :
                <>
                    <TextInputField placeholder={"Add New Tags"} style={{width: "234px"}}
                                    onSubmit={addTextItem}/>
                    <FixedTextInputField items={textItems} removeItem={removeTextItem} iconSize={15}/>
                </>
            }
        </Block>
    </>;
};

export default Tags;
