import './ExamLiveSubmissions.scss';
import {ExamInPageNavigationBar} from "../ExamInPageNavigationBar";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {useParams, useRouteMatch} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {TableCell} from "../../../utils/TableCell";
import {displayDate} from "../../../utils/utils";
import FakeLink from "../../commons/FakeLink";
import {Spinner} from "../../commons/Spinner";
import {examService, liveSubmissionsService} from "../../../services/services";

const ExamLiveSubmissions = function () {
    const {url: currentURL} = useRouteMatch();
    const {examId} = useParams();
    const [exam, setExam] = useState(undefined);
    const [liveSubmissionsState, setLiveSubmissionsState] = useState([]) // {...LiveSubmissionEvent, verdict?, studentName, problemTitle}[]```
    let subscriptions = [];
    let liveSubmissions = [];

    useEffect(() => {
        if (!exam)
            examService.getExam(examId)
                       .then(setExam);
    }, [exam, examId, setExam]);

    useEffect(() => {
        queryLatestExamSubmissions(examId);
        subscribeEvents();
        return () => {
            unsubscribeEvents();
        };
        // TODO: figure out the best practice.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function queryLatestExamSubmissions(examId) {
        liveSubmissionsService.queryLatestExamSubmissions(examId)
            .then(submissions => {
                liveSubmissions = submissions;
                setLiveSubmissionsState(liveSubmissions);
            });
    }

    function subscribeEvents() {
        subscriptions.push(liveSubmissionsService.subscribeToLiveSubmissionEvent(examId, onNewLiveSubmission));
        subscriptions.push(liveSubmissionsService.subscribeToVerdictIssuedEvent(examId, onVerdictIssuedEvent));
    }

    function unsubscribeEvents() {
        subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    function onNewLiveSubmission(liveSubmission) {
        liveSubmissions = [liveSubmission, ...liveSubmissions];
        setLiveSubmissionsState(liveSubmissions);
    }

    function onVerdictIssuedEvent(verdictIssuedEvent) {
        let liveSubmission = liveSubmissions.find(s => s.submissionId === verdictIssuedEvent.submissionId);
        if (liveSubmission) {
            liveSubmission.verdict = verdictIssuedEvent.verdict;
            setLiveSubmissionsState([...liveSubmissions]);
        }
    }

    const VerdictSummary = ({verdict}) => {
        let summaryStatus = verdict?.summaryStatus;
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
                return <span>{'(' + verdict.maximumRuntime}&nbsp;ms,&nbsp;{verdict?.maximumMemoryUsage}&nbsp;KB{')'}</span>
            case 'WA':
            case 'TLE':
            case 'RE':
                return <span>{'('}score:&nbsp;{verdict?.totalGrade + ')'}</span>
            case 'CE':
            case 'MLE':
            case 'OLE':
            case 'SYSTEM_ERR':
            default:
                return <span/>;
        }
    }

    if (!exam || !liveSubmissions)
        return <Spinner/>;

    return <div className="exam-submissions">
        <ExamInPageNavigationBar
            currentURL={currentURL}
            examName={exam.name}
            examId={examId}/>
        <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
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
                                  list: liveSubmissionsState,
                                  key: liveSubmissions => liveSubmissions.submissionId,
                                  data: liveSubmissions => [
                                      <TableCell>{liveSubmissions?.problemId}</TableCell>,
                                      <FakeLink>{liveSubmissions?.problemTitle}</FakeLink>,
                                      <TableCell>{liveSubmissions?.studentName}</TableCell>,
                                      <TableCell>
                                          <VerdictSummary verdict={liveSubmissions?.verdict}/>
                                      </TableCell>,
                                      <TableCell>{displayDate(liveSubmissions?.submissionTime)}</TableCell>
                                  ]
                              }}/>
            </div>
        </div>
    </div>
}

export default ExamLiveSubmissions;