import {HomeworkPageNavigationBar} from "../HomeworkPageNavigationBar";
import {TableCell} from "../../../utils/TableCell";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {useRouteMatch} from "react-router";
import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {homeworkService} from "../../../services/services";
import {AiOutlineMail, AiOutlineUsergroupAdd} from "react-icons/ai";
import {TextareaModal} from "../../commons/modals/TextareaModal";
import './HomeworkPage.scss';
import {Spinner} from "../../commons/Spinner";

const HomeworkProgressPage = () => {
    const {url: currentURL} = useRouteMatch();
    const {homeworkId} = useParams();
    const [currentHomework, setCurrentHomework] = useState(undefined);
    const [showAddStudentModal, setShowAddStudentModal] = useState(undefined);
    const [showAddGroupModal, setShowAddGroupModal] = useState(undefined);

    useEffect(() => {
        if (!currentHomework) {
            fetchHomework(homeworkId);
        }
    });

    function fetchHomework(homeworkId) {
        homeworkService.getHomeworkById(homeworkId)
            .then(homework => setCurrentHomework(homework));
    }

    if (!currentHomework) {
        return <Spinner/>;
    }
    return (
        <div className="homework-score">
            <HomeworkPageNavigationBar currentURL={currentURL}
                                       homeworkName={currentHomework?.name}
                                       homeworkId={homeworkId}/>
            <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                <div className="mt-2" style={{display: "flex", justifyContent: "center"}}>
                    <div className="mt-4 mr-3" style={{width: "fit-content", textAlign: "center"}}>
                        <div className="homework-button">
                            <button className="import-students-button button mt-2"
                                    onClick={() => setShowAddStudentModal(true)}>
                                Import Students
                            </button>
                            <button className="import-groups-button button mt-2"
                                    onClick={() => setShowAddGroupModal(true)}>
                                Import Groups
                            </button>
                            <button className="button export-csv-button">Export CSV
                            </button>
                        </div>
                    </div>

                    <ItemListPage
                        width="1000px"
                        tableHeaders={[
                            <TableCell>Name</TableCell>,
                            ...currentHomework.problemIds.map(problemId => <TableCell>{problemId}</TableCell>),
                            <TableCell>Table Score</TableCell>
                        ]}
                        showFilterSearchBar={false}/>

                    <TextareaModal title="Import Students"
                                   body={{
                                       description: "To see the homework progress for each students.",
                                       Icon: AiOutlineMail,
                                       placeholder: "studentA@example.com\nstudentB@example.com",
                                       remark: "＊One student email per line.",
                                       buttonName: "Import"
                                   }}
                                   show={showAddStudentModal}
                                   onClose={() => setShowAddStudentModal(false)}/>

                    <TextareaModal title="Import Groups"
                                   body={{
                                       description: "To see the homework progress for students in groups.",
                                       Icon: AiOutlineUsergroupAdd,
                                       placeholder: "group-name-1\ngroup-name-1",
                                       remark: "＊One group name per line.",
                                       buttonName: "Import"
                                   }}
                                   show={showAddGroupModal}
                                   onClose={() => setShowAddGroupModal(false)}/>
                </div>
            </div>
        </div>

    )
}

export default HomeworkProgressPage
