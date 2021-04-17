import * as React from "react";


const UpdateChangeButton = ({onUpdateChangeButtonClick}) => {
  return (
    <button className="button ml-2"
            style={{flexGrow: "1"}} onClick={onUpdateChangeButtonClick}>
      Update Change
    </button>
  )
}



export {UpdateChangeButton}