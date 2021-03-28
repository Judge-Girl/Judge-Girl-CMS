import './ExamList.css';
import * as React from "react";
import {useEffect, useState} from "react";
import {examService} from "../../services/services";
import * as moment from "moment";
import {CreateExamModal} from "./CreateExamModal";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import FakeLink from "../commons/FakeLink";


function formatDate(timestamp) {
    return moment(timestamp).format('YYYY/MM/DD  h:mm A');
}

const useExamList = function () {
    const [exams, setExams] = useState(undefined);
    const addExam = (exam) => {
        exams.push(exam);
        setExams(exams);
    };

    return {exams, setExams, addExam}
};

const ExamList = function () {
    const [showCreateExamModal, setShowCreateExamModal] = useState(false);
    const {exams, setExams, addExam} = useExamList();

    useEffect(() => {
        if (!exams || exams.length === 0) {
            examService.getExams()
                .then(exams => setExams(exams));
        }
    });

    return (
        <div className="container font-poppins">

            <ItemListPage title="Exam List"
                          filterItems={["Filter", "Id", "name"]}
                          onCreateButtonClick={e => setShowCreateExamModal(true)}
                          tableHeaders={["#", "Exam Name", "Start Time", "End Time"]}
                          tableRowGenerator={{
                              list: exams,
                              key: (exam) => exam.id,
                              data: (exam) => [
                                  exam?.id,
                                  (<FakeLink content={exam.name}/>),
                                  formatDate(exam?.startTime),
                                  formatDate(exam?.endTime),
                              ]
                          }}/>

            <CreateExamModal show={showCreateExamModal}
                             onClose={() => setShowCreateExamModal(false)}
                             onExamCreated={exam => addExam(exam)}/>
        </div>
    )
};


export {ExamList};
