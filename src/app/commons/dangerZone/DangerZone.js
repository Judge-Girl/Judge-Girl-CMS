import './DangerZone.scss'
import {TitleLine} from "../titles/TitleLine";
import React from "react";

const DangerZone = function ({onDangerButtonClicked, header, description, buttonName}) {
    return (
        <div className="danger-zone">
            <TitleLine title={"Danger Zone"}/>
            <section>
                <div className="danger-box">
                    <div className="columns">
                        <div className="column">
                            <p className="danger-zone-title">{header}</p>
                            <p className="description">{description}</p>
                        </div>
                        <div className="column is-narrow mt-1 mr-5">
                            <button className="button" onClick={onDangerButtonClicked}>
                                {buttonName}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

};

export {DangerZone};
