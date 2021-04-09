import './DropDownButton.scss'
import React, {useState} from "react";

const DropDownBtn = function ({buttonName, subButtons}) {
    const [active, setActive] = useState(true);

    return (
        <div>
            <div className={"dropdown" + (active ? "" : " is-active")}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                            onClick={() => setActive(open => !open)}
                            onBlur={() => setActive(open => !open)}>
                        <span>{buttonName}</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {
                            subButtons?.map(item =>
                                <p className="dropdown-item" onMouseDown={item[1]}>{item[0]}</p>)
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export {DropDownBtn};