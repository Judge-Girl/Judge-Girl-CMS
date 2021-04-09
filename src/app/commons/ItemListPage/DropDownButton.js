import './DropDownButton.scss'
import React, {useState} from "react";

const DropDownBtn = function ({onAddStudentBtnClick, onAddGroupBtnClick}) {
    const [active, setActive] = useState(true);

    return (
        <div>
            <div className={"dropdown" + (active ? "" : " is-active")}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                            onClick={() => setActive(open => !open)}
                            onBlur={() => setActive(open => !open)}>
                        <span>+ People</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <p className="dropdown-item" onMouseDown={onAddStudentBtnClick}>Student</p>
                        <p className="dropdown-item" onMouseDown={onAddGroupBtnClick}>Group</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export {DropDownBtn};