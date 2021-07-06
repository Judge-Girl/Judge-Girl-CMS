import React from "react";
import Card from "../Card";

const ExamSummary = ({
    vertical=false,
    averageScore,
    maxScore,
    totalExaminees
 }) => {
    return <>
        <div style={{
            display: "flex",
            flexDirection: vertical? "column": "row",
            justifyContent: "flex-start"}}>
            <Card title="Average Score" style={{color: "#0B5286"}}>
                <span style={{fontSize: "40px"}}>{averageScore}</span> / {maxScore}
            </Card>
            <Card title="# of Examinees" style={{color: "#0B5286"}}>
                <span style={{fontSize: "40px"}}>{totalExaminees}</span>
            </Card>
        </div>
    </>
}

export default ExamSummary