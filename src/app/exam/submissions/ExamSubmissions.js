import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage";
import { useParams, useRouteMatch } from "react-router-dom";
import React, { useState } from "react";
import { useExamContext } from "../questions/ExamContext";
import { TableCell } from "../../../utils/TableCell";
import { displayDate } from "../../../utils/utils";
import { Spinner } from "../../commons/Spinner";
import FakeLink from "../../commons/FakeLink";
import VerdictIssuedEvent from "../../../models/VerdictIssuedEvent";
import Verdict from "../../../models/Verdict";
import './ExamSubmissions.scss';

const ExamSubmissions = () => {
    const { url: currentURL } = useRouteMatch();
    const { currentExam } = useExamContext();
    const { examId } = useParams();
    const [verdictIssuedEvents] = useState([
        new VerdictIssuedEvent({ problemId: "398428", problemTitle: "50140 File Encoder and Decoder", studentId: "B09902116", verdict: new Verdict({ summaryStatus: "AC", maximumRuntime: 74, maximumMemoryUsage: 256 }), submissionTime: 1619757296345 }),
        new VerdictIssuedEvent({ problemId: "398427", problemTitle: "134 Reconstruct A Binary Tree", studentId: "B09902116", verdict: new Verdict({ summaryStatus: "WA", totalGrade: 60 }), submissionTime: 1619757296345 }),
        new VerdictIssuedEvent({ problemId: "398426", problemTitle: "134 Reconstruct A Binary Tree", studentId: "B09902116", verdict: new Verdict({ summaryStatus: "TLE", totalGrade: 20 }), submissionTime: 1619757296345 }),
        new VerdictIssuedEvent({ problemId: "398425", problemTitle: "222 Bookshelf", studentId: "B09902116", verdict: new Verdict({ summaryStatus: "CE" }), submissionTime: 1619757296345 }),
        new VerdictIssuedEvent({ problemId: "398424", problemTitle: "222 Bookshelf", studentId: "B09902116", verdict: new Verdict({ summaryStatus: "RE", totalGrade: 20 }), submissionTime: 1619757296345 })
    ]);

    if (!currentExam) {
        return <Spinner />
    }

    const VerdictSummary = ({ verdict }) => {
        var summaryStatus = verdict?.summaryStatus;
        return (
            <>
                <span className={summaryStatus}>
                    {summaryStatus}&nbsp;</span>
                {renderStatus(verdict)}
            </>
        );
    }

    function renderStatus(verdict) {
        switch (verdict?.summaryStatus) {
            case 'AC':
                return <span>({verdict.maximumRuntime}&nbsp;ms,&nbsp;{verdict?.maximumMemoryUsage}&nbsp;KB)</span>
            case 'WA':
            case 'TLE':
            case 'RE':
                return <span>(score:&nbsp;{verdict?.totalGrade})</span>
            case 'CE':
            default:
                return <span />;
        }
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
                        <TableCell style={{ color: "#676877" }}>#</TableCell>,
                        <TableCell style={{ color: "#676877" }}>Problem Title</TableCell>,
                        <TableCell style={{ color: "#676877" }}>User Name</TableCell>,
                        <TableCell style={{ color: "#676877" }}>Verdict</TableCell>,
                        <TableCell style={{ color: "#676877" }}>Submit Time</TableCell>
                    ]}
                    tableRowGenerator={{
                        list: verdictIssuedEvents,
                        key: (verdictIssuedEvent) => verdictIssuedEvent.problemId,
                        data: (verdictIssuedEvent) => [
                            <TableCell>{verdictIssuedEvent?.problemId}</TableCell>,
                            <FakeLink>{verdictIssuedEvent?.problemTitle}</FakeLink>,
                            <TableCell>{verdictIssuedEvent?.studentId}</TableCell>,
                            <TableCell>
                                <VerdictSummary verdict={verdictIssuedEvent.verdict} />
                            </TableCell>,
                            <TableCell>{displayDate(verdictIssuedEvent?.submissionTime)}</TableCell>
                        ]
                    }} />
            </div>
        </div>
    </div>
}

export default ExamSubmissions;