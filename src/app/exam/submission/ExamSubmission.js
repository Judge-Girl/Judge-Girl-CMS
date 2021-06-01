import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage";
import { useParams, useRouteMatch } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useExamContext } from "../questions/ExamContext";
import { TableCell } from "../../../utils/TableCell";
import { displayDate } from "../../../utils/utils";
import { Spinner } from "../../commons/Spinner";
import FakeLink from "../../commons/FakeLink";
import Submission from "../../../models/Submission";
import Verdict from "../../../models/Verdict";
import './ExamSubmission.scss';

const ExamSubmission = () => {
    const { url: currentURL } = useRouteMatch();
    const { currentExam, setCurrentExam } = useExamContext();
    const { examId } = useParams();
    const [submissions, setSubmissions] = useState([
        new Submission("398428", "50140 File Encoder and Decoder", "B09902116", new Verdict("AC", "(74 ms, 256 KB)"), "2021/04/30 12:34:56"),
        new Submission("398427", "134 Reconstruct A Binary Tree", "B09902116", new Verdict("WA", "(score: 60)"), "2021/04/30 12:34:56"),
        new Submission("398426", "134 Reconstruct A Binary Tree", "B09902116", new Verdict("TLE", "(score: 20)"), "2021/04/30 12:34:56"),
        new Submission("398425", "222 Bookshelf", "B09902116", new Verdict("CE", ""), "2021/04/30 12:34:56"),
        new Submission("398424", "222 Bookshelf", "B09902116", new Verdict("RE", "(score: 20)"), "2021/04/30 12:34:56"),
    ]);

    if (!currentExam) {
        return <Spinner />
    }

    return <div className="exam-submissions">
        <ExamInPageNavigationBar
            currentURL={currentURL}
            examName={currentExam.name}
            examId={examId} />
        <div className="font-poppins" style={{ paddingTop: "20px", paddingBottom: "150px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ItemListPage width="1200px"
                    showFilterSearchBar={false}
                    tableHeaders={[
                        <TableCell>#</TableCell>,
                        <TableCell>Problem Title</TableCell>,
                        <TableCell>User Name</TableCell>,
                        <TableCell>Verdict</TableCell>,
                        <TableCell>Submit Time</TableCell>
                    ]}
                    tableRowGenerator={{
                        list: submissions,
                        key: (submission) => submission.id,
                        data: (submission) => [
                            <TableCell>{submission?.id}</TableCell>,
                            <FakeLink>{submission?.title}</FakeLink>,
                            <TableCell>{submission?.userName}</TableCell>,
                            <TableCell>
                                <span className={submission?.verdict?.judgeStatus}>
                                    {submission?.verdict?.judgeStatus}&nbsp;</span>
                                <span>{submission?.verdict?.description}</span>
                            </TableCell>,
                            <TableCell>{displayDate(submission?.submitTime)}</TableCell>
                        ]
                    }} />
            </div>
        </div>
    </div>
}

export default ExamSubmission;