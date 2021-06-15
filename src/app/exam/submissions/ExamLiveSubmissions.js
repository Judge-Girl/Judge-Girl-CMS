import { ExamInPageNavigationBar } from "../ExamInPageNavigationBar";
import { ItemListPage } from "../../commons/ItemListPage/ItemListPage";
import { useParams, useRouteMatch } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useExamContext } from "../questions/ExamContext";
import { TableCell } from "../../../utils/TableCell";
import { displayDate } from "../../../utils/utils";
import FakeLink from "../../commons/FakeLink";
import VerdictIssuedEvent from "../../../models/VerdictIssuedEvent";
import LiveSubmissionEvent from "../../../models/LiveSubmissionEvent";
import { studentService, problemService, liveSubmissionsService } from "../../../services/services";
import './ExamLiveSubmissions.scss';

var examSubscriptions = {};

const ExamLiveSubmissions = () => {
    const { url: currentURL } = useRouteMatch();
    const { currentExam, refetchExam } = useExamContext();
    const { examId } = useParams();
    const [verdictIssuedEvents, setVerdictIssuedEvents] = useState([])
    var events = {};
    var eventSubscriptions = [];
    
    useEffect(() => {
        if (!currentExam) {
            refetchExam(examId);
        }
        subscribeEvents();
    });

    function subscribeEvents() {
        if (!examSubscriptions[examId]) {
            examSubscriptions[examId] = examId;
            eventSubscriptions.push(liveSubmissionsService.subscribeToSubmitCompletion(examId, submitSubscriber));
            eventSubscriptions.push(liveSubmissionsService.subscribeToVerdictCompletion(examId, verdictSubscriber));
        }
    }

    function submitSubscriber(message) {
        var liveSubmissionEvent = new LiveSubmissionEvent(JSON.parse(message.body));
        var submissionId = liveSubmissionEvent.submissionId;
        events[submissionId] = liveSubmissionEvent;
        updateSubmissionEventProblemTitle(submissionId, liveSubmissionEvent);
        updateSubmissionEventStudentName(submissionId, liveSubmissionEvent);
    }

    function updateSubmissionEventProblemTitle(submissionId, liveSubmissionEvent) {
        problemService.getProblemById(liveSubmissionEvent.problemId)
            .then(problem => {
                events[submissionId]["problemTitle"] = problem.title;
                updateSubmissionEvent();
            });
    }

    function updateSubmissionEventStudentName(submissionId, liveSubmissionEvent) {
        studentService.getStudentById(liveSubmissionEvent.studentId)
            .then(student => {
                events[submissionId]["studentName"] = student.name;
                updateSubmissionEvent();
            });
    }

    function verdictSubscriber(message) {
        var verdictIssuedEvent = new VerdictIssuedEvent(JSON.parse(message.body));
        updateSubmissionEventVerdict(verdictIssuedEvent);
    }

    function updateSubmissionEventVerdict(verdictIssuedEvent) {
        var submissionId = verdictIssuedEvent.submissionId;
        var liveSubmissionEvent = events[submissionId];
        if (liveSubmissionEvent) {
            liveSubmissionEvent["verdict"] = verdictIssuedEvent.verdict;
            updateSubmissionEvent();
        }
    }

    function updateSubmissionEvent() {
        setVerdictIssuedEvents(Object.values(events).reverse());
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
            examName={currentExam?.name}
            examId={examId} />
        <div className="font-poppins" style={{ paddingTop: "20px", paddingBottom: "150px" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <ItemListPage width="1200px"
                    showFilterSearchBar={false}
                    tableHeaders={[
                        <TableCell className={"header"}>#</TableCell>,
                        <TableCell className={"header"}>Problem Title</TableCell>,
                        <TableCell className={"header"}>User Name</TableCell>,
                        <TableCell className={"header"}>Verdict</TableCell>,
                        <TableCell className={"header"}>Submit Time</TableCell>
                    ]}
                    tableRowGenerator={{
                        list: verdictIssuedEvents,
                        key: (verdictIssuedEvent) => verdictIssuedEvent.submissionId,
                        data: (verdictIssuedEvent) => [
                            <TableCell>{verdictIssuedEvent?.problemId}</TableCell>,
                            <FakeLink>{verdictIssuedEvent?.problemTitle}</FakeLink>,
                            <TableCell>{verdictIssuedEvent?.studentName}</TableCell>,
                            <TableCell>
                                <VerdictSummary verdict={verdictIssuedEvent?.verdict} />
                            </TableCell>,
                            <TableCell>{displayDate(verdictIssuedEvent?.submissionTime)}</TableCell>
                        ]
                    }} />
            </div>
        </div>
    </div>
}

export default ExamLiveSubmissions;