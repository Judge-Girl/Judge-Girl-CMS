import * as React from "react";

const CreateButton = ({onClick}) => {
    return (
        <button className="button ml-2 my-green-btn"
                style={{flexGrow: "1"}} onClick={onClick}>+ Create
        </button>
    )
}

export {CreateButton};