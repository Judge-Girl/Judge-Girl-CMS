import Block from "./Block";
import {useState} from "react";
import {ESCButton} from "../commons/ESCButton";
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
                   <ESCButton
                       isEditing={isEditing}
                       onClickEdit={onClickEdit}
                       onClickSave={onClickSave}
                       onClickCancel={onClickCancel}/>
               }>
            {!isEditing?
                <>
                </>
                :
                <>
                </>
            }
            <TestCaseList/>
        </Block>
    </>;
};

export default TestCases;
