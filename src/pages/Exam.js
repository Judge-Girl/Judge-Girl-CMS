import './Exam.css';
import * as React from "react";
import 'bulma';

const Exam = function () {
    return (
        <div className="font-poppins is-flex is-flex-direction-column p-6">
            <div className="custom-title-font">
                Exam List
            </div>
            <div className="is-flex mb-3">
                <div>
                    <div className="select" id="filter">
                        <select>
                            <option>Filter</option>
                            <option>Id</option>
                            <option>Name</option>
                        </select>
                    </div>
                </div>
                <input type="text" id="searchBar" className="is-full"/>
            </div>

            <table /**ngIf="!loadingExams"*/ className="table my-exam-table">
                <thead>
                <tr>
                    <th scope="col"> #</th>
                    <th scope="col"> Exam Name</th>
                    <th scope="col"> Start Time</th>
                    <th scope="col"> End Time</th>
                </tr>
                </thead>
                <tbody>
                <tr /**ngFor="let examItem of examItems"*/>
                    <th scope="row"> exam's id</th>
                    <td><span className="fake-link" /*onClick=""*/> exam's title </span>
                    </td>
                    <td> start time</td>
                    <td> end time</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
};


export {Exam};
