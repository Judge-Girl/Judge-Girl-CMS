import * as React from "react";

const CreateButton = function ({onCreateButtonClick}) {
    return (
        <button className="button ml-2 my-green-btn"
                style={{flexGrow: "1"}} onClick={onCreateButtonClick}>+ Create
        </button>
    )
}

export {CreateButton};