import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import FakeLink from "../../commons/FakeLink";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton";
import {useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useExamContext} from "../problems/ExamContext";
import {Spinner} from "../../commons/Spinner";


const ExamScore = () => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const { currentExam, refetchExam } = useExamContext()
    const [averageScore, setAverageScore] = useState(0.0)
    const [examinees, setExaminees] = useState([
        {
            studentId: "R09922111",
            A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "80",
        },
        {
            studentId: "R09922112",
            A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "70",
        },
        {
            studentId: "R09922113",
            A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "60",
        },
        {
            studentId: "R09922114",
            A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "87",
        },
    ])

    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId)
        }
        let total = 0.0
        examinees.forEach((examinee) => {
            total += parseFloat(examinee.totalScore)
        })
        setAverageScore(total/examinees.length)
    }, [examId, currentExam, examinees, averageScore, refetchExam]);

    const dropDownItems = (studentId) => [{
        name: "Delete",
        dangerous: true,
        onClick: () => {
            setExaminees(prev => {
                console.log("DEBUG----------123", prev.filter(examinee => examinee.studentId !== studentId))
                return prev.filter(examinee => examinee.studentId !== studentId)
            })
        }
    }];

    if (!currentExam) {
        return <Spinner/>
    }

    return (
        <div className="exam-score">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExam.name}
                examId={examId} />
            <div style={{ padding: "20px 10% 20px 10%" }}>
                <div className="columns mt-2">
                    <div className="mt-4 mr-3" style={{ width: "17%", textAlign: "center" }}>
                        <div className="card" style={{ width: "auto" }}>
                            <div className="card-content">
                                <div className="content" style={{ color: "#0B5286" }}>
                                    <span style={{ fontSize: "20px" }}>Average Score</span>
                                    <br/>
                                    <span style={{ fontSize: "50px" }}>{averageScore}</span>/100
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="card" style={{ width: "auto" }}>
                            <div className="card-content">
                                <div className="content" style={{ color: "#0B5286" }}>
                                    <span style={{ fontSize: "20px" }}># of Examinees</span>
                                    <br/>
                                    <span style={{ fontSize: "50px" }}>{examinees.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{ width: "70%" }}>
                        <ItemListPage
                            tableHeaders={["Name", "A", "B", "C", "D", "E", "Total score"]}
                            tableRowGenerator={{
                                list: examinees,
                                key: examinee => examinee.studentId,
                                data: (examinee) => {
                                    return [
                                        <FakeLink content={examinee.studentId} />,
                                        <FakeLink content={examinee.A} />,
                                        <FakeLink content={examinee.B} />,
                                        <FakeLink content={examinee.C} />,
                                        <FakeLink content={examinee.D} />,
                                        <FakeLink content={examinee.E} />,
                                        <FakeLink content={examinee.totalScore} />,

                                        <div style={{ textAlign: "middle" }}>
                                            <ThreeDotsButton dropDownItems={dropDownItems(examinee.studentId)}/>
                                        </div>

                                    ]
                                },
                            }}
                            showFilterSearchBar={false}
                            tableDataStyle={{
                                textAlign: "left",
                                verticalAlign: "middle",
                                height: "50px",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamScore