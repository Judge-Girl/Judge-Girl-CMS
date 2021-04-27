import * as React from "react";


const UpdateChangeButton = ({onUpdateChangeButtonClick}) => {
  return (
    <button className="button is-info" onClick={onUpdateChangeButtonClick}>
      Update Change
    </button>
  )
}



export {UpdateChangeButton}