import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import FakeLink from "../../commons/FakeLink";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton";
import {useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useExamContext} from "../problems/ExamContext";
import {Spinner} from "../../commons/Spinner";
import {EmptyCell, TableCell} from "../../../utils/TableCell";


const ExamScore = () => {
    const {url: currentURL} = useRouteMatch()
    const {examId} = useParams()
    const {currentExam, refetchExam} = useExamContext()
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
        setAverageScore(parseFloat((total / examinees.length).toFixed(2)))
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
        <div className="exam-score font-poppins">
            <ExamInPageNavigationBar currentURL={currentURL}
                                     examName={currentExam.name}
                                     examId={examId}/>
            <div style={{paddingTop: "20px"}}>
                <div className="mt-2" style={{display: "flex", justifyContent: "center"}}>
                    <div className="mt-4 mr-3" style={{width: "fit-content", textAlign: "center"}}>
                        <div className="card">
                            <div className="card-content">
                                <div className="content" style={{color: "#0B5286"}}>
                                    <span style={{fontSize: "20px"}}>Average Score</span>
                                    <br/>
                                    <span style={{fontSize: "40px"}}>{averageScore}</span> / 100
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="card">
                            <div className="card-content">
                                <div className="content" style={{color: "#0B5286"}}>
                                    <span style={{fontSize: "20px"}}># of Examinees</span>
                                    <br/>
                                    <span style={{fontSize: "40px"}}>{examinees.length}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ItemListPage
                        width="800px"
                        tableHeaders={[
                            <TableCell>Name</TableCell>,
                            <TableCell>A</TableCell>,
                            <TableCell>B</TableCell>,
                            <TableCell>C</TableCell>,
                            <TableCell>D</TableCell>,
                            <TableCell>E</TableCell>,
                            <TableCell>Table Score</TableCell>,
                            <EmptyCell/>
                        ]}
                        tableRowGenerator={{
                            list: examinees,
                            key: examinee => examinee.studentId,
                            data: (examinee) => {
                                return [
                                    <FakeLink>{examinee.studentId}</FakeLink>,
                                    <FakeLink>{examinee.A}</FakeLink>,
                                    <FakeLink>{examinee.B}</FakeLink>,
                                    <FakeLink>{examinee.D}</FakeLink>,
                                    <FakeLink>{examinee.C}</FakeLink>,
                                    <FakeLink>{examinee.E}</FakeLink>,
                                    <FakeLink>{examinee.totalScore}</FakeLink>,
                                    <TableCell>
                                        <ThreeDotsButton dropDownItems={dropDownItems(examinee.studentId)}/>
                                    </TableCell>,
                                ]
                            },
                        }}
                        showFilterSearchBar={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ExamScore