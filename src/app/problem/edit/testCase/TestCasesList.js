import {SubtitleLine} from "../../../commons/titles/TitleLine";
import React, {useState} from "react";
import {EditorButton} from "../EditorButton";

function TestCase() {
    const addNewTestCase () => (


    );

    return (
        <div>
            <SubtitleLine title="Test Cases" />
            <EditorButton
                text={"Add New Test Case"}
                buttonColor={"#1273BA"}
                fontColor={"#FFFFFF"}
                width={702}
                height={46}
                onClick={addNewTestCase}
            />
        </div>
    );
};

export default TestCase;