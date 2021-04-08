import React, {useState} from "react";

const DropDownBtn = function ({selectStudent, selectGroup}) {
    const [active, setActive] = useState(true);
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>{count}</p>

            <div className={"dropdown" + (active ? "" : " is-active")}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                            onClick={() => setActive(open => !open)}
                            onBlur={() => {
                                setActive(open => !open);
                                console.log("click")
                            }}>
                        <span>+ People</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <a className="dropdown-item is-active" onMouseDown={selectStudent}>Student</a>
                        <a className="dropdown-item" onMouseDown={selectGroup}>Group</a>
                    </div>
                </div>
            </div>
        </div>

    );
};

export {DropDownBtn};