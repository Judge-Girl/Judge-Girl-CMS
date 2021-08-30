import Block from "./Block";
import {useState} from "react";
import {EditSaveCancelButton} from "../../commons/EditSaveCancelButton";
import TestCaseList from "./TestCaseList";


const TestCases = () => {
    const [isEditing, setIsEditing] = useState(false);

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        setIsEditing(false);
    }

    const onClickCancel = () => {
        setIsEditing(false);
    }

    return <>
        <Block title="Test Cases"
               id="problem-editor-testcases"
               style={{marginBottom: "50px"}}
               titleButton={
                   <EditSaveCancelButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>{/* TODO: Will be announced in the Github Issue. */}</>
                :
                <TestCaseList/>
            }
        </Block>
    </>;
};

export default TestCases;
