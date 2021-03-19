import './ExamList.css';
import * as React from "react";
import 'bulma';
import {useState} from "react";
import {useEffect} from "react";
import {examService} from "../../services/services";
import * as moment from "moment";
import {CreateExamModal} from "./CreateExamModal";
import {TitleLine} from "../commons/TitleLine";

function formatDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  h:mm A');
}

function renderExamRows(exams) {
    const rows = [];
    for (const exam of exams) {
        rows.push((
            <tr>
                <th scope="row"> {exam.id}</th>
                <td><span className="fake-link" onClick={e => {
                }}> {exam.name} </span>
                </td>
                <td> {formatDate(exam.startTime)} </td>
                <td> {formatDate(exam.endTime)} </td>
            </tr>
        ));
    }
    return rows;
}

const ExamList = function () {
    const [showCreateExamModal, setShowCreateExamModel] = useState(false);
    const [exams, setExams] = useState([]);

    useEffect(() => {
        if (exams.length === 0) {
            examService.getExams()
                .then(exams => setExams(exams));
        }
    }, [exams]);

    const onCreateButtonClick = e => {
        setShowCreateExamModel(true);
    };

    return (
        <div className="container font-poppins">
            <TitleLine title="Exam List"/>
            <div className="is-flex is-justify-content-center">
                <div>
                    <div className="select" id="filter">
                        <select>
                            <option>Filter</option>
                            <option>Id</option>
                            <option>Name</option>
                        </select>
                    </div>
                </div>
                <input style={{flexGrow: "1"}} type="text" id="searchBar"/>
                <button className="button ml-2" id="create-exam-btn"
                        style={{flexGrow: "1"}} onClick={onCreateButtonClick}>+Create
                </button>
            </div>

            <table className="table my-exam-table mt-4">
                <thead>
                <tr>
                    <th scope="col"> #</th>
                    <th scope="col"> Exam Name</th>
                    <th scope="col"> Start Time</th>
                    <th scope="col"> End Time</th>
                </tr>
                </thead>
                <tbody>
                {renderExamRows(exams)}
                </tbody>
            </table>

            <CreateExamModal show={showCreateExamModal}
                             onClose={() => setShowCreateExamModel(false)}/>
        </div>
    )
};


export {ExamList};
