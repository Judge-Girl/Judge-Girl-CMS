import React, {useEffect, useState} from "react";
import {useParams, useRouteMatch} from 'react-router-dom'
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamName from "./ExamName";
import ExamSchedule from "./ExamSchedule";
import ExamWhiteList from "./ExamWhiteList";
import {UpdateChangeButton} from "./UpdateChangeButton";
import {examService} from "../../../services/services";
import {formatDate} from "../../../utils/utils";
import {useExamContext} from "../problems/ExamContext";
import {Spinner} from "../../commons/Spinner";
import './ExamOptions.scss';


const ExamOptions = () => {
    const {url: currentURL} = useRouteMatch()
    const {currentExam, refetchExam} = useExamContext()
    const {examId} = useParams()
    const [newExamName, setNewExamName] = useState()
    const [startTime, setStartTime] = useState(formatDate(currentExam?.startTime))
    const [endTime, setEndTime] = useState(formatDate(currentExam?.endTime))

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId)
        }
    })

    const onButtonUpdateChangeClicked = () => {
        examService.updateExam(examId, {
            examId: examId,
            name: newExamName,
            startTime: startTime,
            endTime: endTime,
            description: "",
        }).then(res => {
            console.log("new:", res)
            console.log("old:", currentExam)
            refetchExam(examId)
        })
    }

    const onButtonDeleteExamClicked = () => {

    }

    if (!currentExam) {
        return <Spinner/>
    }

    return (
        <div className="exam-options">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExam.name}
                examId={examId}/>
            <div style={{paddingTop: "20px"}}>
                <div style={{display: "flex", justifyContent: "flex-start", paddingBottom: "150px"}}>
                    <div style={{display: "flex", flexDirection: "column", alignItems: "flex-start",
                        paddingLeft: "150px"
                    }}>
                        <TitleLine title={"Options"}/>
                        <div className="column is-narrow" style={{width: "450px"}}>
                            <section>
                                <ExamName examName={currentExam.name} setter={setNewExamName}/>
                            </section>
                            <section>
                                <ExamSchedule
                                    startTime={startTime}
                                    endTime={endTime}
                                    setStartTime={setStartTime}
                                    setEndTime={setEndTime}/>
                            </section>
                            <section>
                                <ExamWhiteList/>
                            </section>
                            <section>
                                <UpdateChangeButton
                                    onUpdateChangeButtonClick={onButtonUpdateChangeClicked}/>
                            </section>
                        </div>
                        <div className="column right">
                        </div>

                        <TitleLine title={"Danger Zone"}/>
                        <section>
                            <div className="danger-zone">
                                <div className="columns">
                                    <div className="column">
                                        <p className="title is-spaced is-5">Delete this exam</p>
                                        Once you delete an exam, there is no going back. Please be certain.
                                    </div>
                                    <div className="column is-narrow mt-1 mr-5">
                                        <button
                                            className="button is-danger"
                                            onClick={onButtonDeleteExamClicked}
                                        >Delete Exam
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    )
}


export {ExamOptions}