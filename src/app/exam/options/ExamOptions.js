import React, {useEffect, useRef, useState} from "react";
import {Redirect, useParams, useRouteMatch} from "react-router-dom"
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamName from "./ExamName";
import ExamSchedule from "./ExamSchedule";
import ExamWhiteList from "./ExamWhiteList";
import {examService} from "../../../services/services";
import {formatDate} from "../../../utils/utils";
import {useExamContext} from "../questions/ExamContext";
import {Spinner} from "../../commons/Spinner";
import "./ExamOptions.scss";
import {DangerZone} from "../../commons/dangerZone/DangerZone";
import {DeleteConfirmationModal} from "../../commons/modals/DeleteConfirmationModal";


const ExamOptions = () => {
    const {url: currentURL} = useRouteMatch();
    const {currentExam, refetchExam, exams, setExams} = useExamContext();
    const {examId} = useParams();
    const [newExamName, setNewExamName] = useState(currentExam?.name);
    const [startTime, setStartTime] = useState(formatDate(currentExam?.startTime));
    const [endTime, setEndTime] = useState(formatDate(currentExam?.endTime));
    const [showDeleteExamModal, setShowDeleteExamModal] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const examScheduleRef = useRef();

    useEffect(() => {
        // TODO: if examId doesn't exist, it will call refetchExam() infinitely.
        if (!currentExam) {
            refetchExam(examId)
        }
    });

    const onButtonUpdateChangeClick = () => {
        if (examScheduleRef.current?.validateTimes(startTime, endTime)) {
            examService.updateExam(examId, {
                examId,
                name: newExamName,
                startTime,
                endTime,
                description: currentExam.description
            }).then(() => {
                refetchExam(examId)
            })
        }
    };

    const deleteExam = () => {
        examService.deleteExam(examId)
            .then(() => {
                    setShouldRedirect(true);
                    setExams(exams.filter(g => g !== currentExam));
                }
            )
    };

    if (!currentExam) {
        return <Spinner/>
    }

    return (
        <>
            {shouldRedirect ? <Redirect to="/exams"/> : ""}
            <div className="exam-options">
                <ExamInPageNavigationBar
                    currentURL={currentURL}
                    examName={currentExam.name}
                    examId={examId}/>
                <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <div style={{
                            display: "flex", flexDirection: "column", alignItems: "flex-start",
                            paddingLeft: "150px"
                        }}>
                            <TitleLine title="Options"/>
                            <div className="column is-narrow" style={{width: "450px"}}>
                                <section>
                                    <ExamName examName={currentExam.name} setter={setNewExamName}/>
                                </section>
                                <section>
                                    <ExamSchedule
                                        scheduleRef={examScheduleRef}
                                        startTime={startTime}
                                        endTime={endTime}
                                        setStartTime={setStartTime}
                                        setEndTime={setEndTime}/>
                                </section>
                                <section>
                                    <ExamWhiteList/>
                                </section>
                                <section>
                                    <button className="button update-button"
                                            onClick={onButtonUpdateChangeClick}>
                                        Update Change
                                    </button>
                                </section>
                            </div>
                            <div className="column right">
                            </div>
                            <TitleLine title="Danger Zone"/>
                            <DangerZone onDangerButtonClick={() => setShowDeleteExamModal(true)}
                                        header="Delete this exam"
                                        description="Once you delete an exam, there is no going back. Please be certain."
                                        buttonName="Delete Exam"/>
                        </div>
                    </div>
                </div>

                <DeleteConfirmationModal title="Delete the Exam"
                                         data={[
                                             {
                                                 title: "Exam Name",
                                                 value: currentExam?.name
                                             }
                                         ]}
                                         show={showDeleteExamModal}
                                         onClose={() => setShowDeleteExamModal(false)}
                                         onSubmit={() => deleteExam()}/>
            </div>
        </>
    )
};


export {ExamOptions}
