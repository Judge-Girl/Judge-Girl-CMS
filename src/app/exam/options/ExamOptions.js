import React, {useState} from "react";
import { useParams, useRouteMatch } from 'react-router-dom'
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {TitleLine} from "../../commons/titles/TitleLine";
import ExamName from "./ExamName";
import ExamSchedule from "./ExamSchedule";
import ExamWhiteList from "./ExamWhiteList";
import {UpdateChangeButton} from "./UpdateChangeButton";
import {examService} from "../../../services/services";
import {formatDate} from "../../../utils/utils";
import './ExamOptions.scss';
import {useExamContext} from "../problems/ExamContext";


const ExamOptions = () => {
    const { url: currentURL } = useRouteMatch()
    const { currentExam, setCurrentExam } = useExamContext()
    const { examId } = useParams()
    const [examName, setExamName] = useState(currentExam.name)
    const [startTime, setStartTime] = useState(formatDate(currentExam.startTime))
    const [endTime, setEndTime] = useState(formatDate(currentExam.endTime))

    const onButtonUpdateChangeClicked = () => {
        console.log({
            examId: examId,
            name: examName,
            startTime: startTime,
            endTime: endTime,
            description: "",
        })
        examService.updateExam(examId,{
            examId: examId,
            name: examName,
            startTime: startTime,
            endTime: endTime,
            description: "",
        }).then(() => console.log("Exam Updated."))
    }

    const onButtonDeleteExamClicked = () => {

    }

    return (
        <>
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExam.name}
                examId={examId}/>
            <div style={{padding: "40px 10% 20px 10%"}}>
                <TitleLine title={"Options"}/>
                <div className="columns exam-options">
                    <div className="column is-narrow" style={{width: "450px"}}>
                        <section>
                            <ExamName examName={examName} setter={setExamName}/>
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
        </>
    )
}


export {ExamOptions}