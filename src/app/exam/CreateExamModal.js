import * as React from "react";
import {SubtitleLine} from "../commons/TitleLine";
import "./CreateExamModel.css";

const CreateExamModal = ({show, onClose}) => {
    return (
        <div className={`modal ${show ? 'is-active' : ''}`}>
            <div className="modal-background"/>
            <div className="modal-card">
                <section className="modal-card-body p-6">
                    <SubtitleLine title="Exam Name"/>
                    <input type="text" className="my-3 full-width" id="examNameInput"/>

                    <SubtitleLine title="Schedule"/>
                    <div className="is-flex">
                        <label>Start Date</label>
                        <input type="text" className="my-3"/>
                    </div>
                    <SubtitleLine title="White List"/>

                    <button className="delete" aria-label="close" onClick={e => onClose()}/>
                </section>
            </div>
        </div>
    )
};


export {CreateExamModal}
