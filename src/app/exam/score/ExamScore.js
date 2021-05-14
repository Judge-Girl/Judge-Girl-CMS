import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import FakeLink from "../../commons/FakeLink";
import {ThreeDotsButton} from "../../commons/buttons/ThreeDotsButton";
import {useParams, useRouteMatch} from "react-router-dom";
import {useEffect, useState} from "react";
import {examService} from "../../../services/services";


const ExamScore = ({ exams }) => {
    const { url: currentURL } = useRouteMatch()
    const { examId } = useParams()
    const currentExamName = exams.find(exam => exam.id === parseInt(examId))?.name
    const [examinees, setExaminees] = useState()

    useEffect(() => {
        examService.getExam(examId)
            .then(exam => {
                console.log(exam)
            });
        // problemService.getProblemById(problem.problemId)
        //     .then(res => setProblemId2Title(prev => prev.set(problem.problemId, res.title)))
        setExaminees([
            {
                studentId: "R09922111",
                A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "100",
            },
            {
                studentId: "R09922111",
                A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "100",
            },
            {
                studentId: "R09922111",
                A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "100",
            },
            {
                studentId: "R09922111",
                A: "20", B: "20", C: "20", D: "20", E: "20", totalScore: "100",
            },
        ])
    }, [examId]);

    const dropDownItems = (studentId) => [{
        name: "Edit",
        dangerous: false,
        onClick: () => {
        }
    }, {
        name: "Rejudge",
        dangerous: false,
        onClick: () => {
        }
    }, {
        name: "Delete",
        dangerous: true,
        onClick: () => {
        }
    }];

    return (
        <div className="exam-score">
            <ExamInPageNavigationBar
                currentURL={currentURL}
                examName={currentExamName}
                examId={examId} />
            <div className="container">
                <div className="columns">
                    <div className="column is-one-fifth mt-6">
                        <div className="card" style={{ width: "200px" }}>
                            <div className="card-content">
                                <div className="content">
                                    Average Score: <span>75.5/100</span>
                                    <br/>

                                </div>
                            </div>
                        </div>
                        <br/>
                        <div className="card" style={{ width: "200px" }}>
                            <div className="card-content">
                                <div className="content">
                                    Average Score: <span>75.5/100</span>
                                    <br/>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-three-fifths">
                        <ItemListPage
                            title="Participants"
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
                                        // <div style={{width: "20px", height: "28px"}}>
                                        <div style={{ textAlign: "middle" }}>
                                            <ThreeDotsButton dropDownItems={dropDownItems(examinee.studentId)}/>
                                        </div>
                                        // </div>
                                    ]
                                },
                            }}
                            showFilterSearchBar={false}
                            tableDataStyle={{
                                textAlign: "left",
                                verticalAlign: "middle",
                                height: "50px",
                                // tableLayout: "fixed"
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExamScore