import './ThreeDotButton.scss'
import React, {useState} from "react";
import {FaEllipsisV} from "react-icons/fa";

/**
 * @param buttonName the button's name (str) show on the main button
 * @param dropDownItems the item in the dropdown. 2 fields.
 *          (1) name: dropDownItem's name
 *          (2) onClick: the event when you click the dropDownItem
 * @param Icon the main button's Icon
 */

const ThreeDotButton = function ({dropDownItems}) {
    const [active, setActive] = useState(true);

    return (
        <div>
            <div className={"dropdown three-dot-button" + (active ? "" : " is-active")}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                            onClick={() => setActive(open => !open)}
                            onBlur={() => setActive(open => !open)}>
                        <FaEllipsisV/>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        {
                            dropDownItems?.map(item =>
                                <p className={"dropdown-item " + (item.dangerous ? "is-dangerous" : "")}
                                   onMouseDown={item.onClick}>{item.name}</p>)
                        }
                    </div>
                </div>
            </div>
        </div>

    );
};

export {ThreeDotButton};