import './ExamOptions.scss';
import React, {useEffect, useRef, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {TitleLine} from '../../commons/titles/TitleLine';
import ExamName from './ExamName';
import ExamSchedule from './ExamSchedule';
import {examService} from '../../../services/services';
import {formatDate} from '../../../utils/utils';
import {useExamContext} from '../questions/ExamContext';
import {Spinner} from '../../commons/Spinner';
import {DangerZone} from '../../commons/dangerZone/DangerZone';
import moment from 'moment';
import {DeleteConfirmationModal} from '../../commons/modals/ConfirmationModal';
import ExamWhiteList from './ExamWhiteList';


const ExamOptions = () => {
  const history = useHistory();
  const {examId} = useParams();
  const {updateExams} = useExamContext();
  const [exam, setExam] = useState(undefined);
  const [examName, setExamName] = useState(undefined);
  const [startTime, setStartTime] = useState(formatDate(undefined));
  const [endTime, setEndTime] = useState(formatDate(undefined));
  const [whitelist, setWhitelist] = useState([]);
  const [showDeleteExamModal, setShowDeleteExamModal] = useState(false);
  const examScheduleRef = useRef();

  useEffect(() => {
    if (!exam) {
      examService.getExam(examId)
        .then(exam => {
          setExamName(exam.name);
          setStartTime(formatDate(exam?.startTime));
          setEndTime(formatDate(exam?.endTime));
          setWhitelist(exam.whitelist);
          setExam(exam);
        });
    }
  }, [exam, examId, setExam]);

  const onButtonUpdateChangeClick = () => {
    if (examScheduleRef.current?.validateTimes(startTime, endTime)) {
      examService.updateExam(examId, {
        examId,
        name: examName,
        startTime: moment(startTime).valueOf(),
        endTime: moment(endTime).valueOf(),
        description: exam.description,
        whitelist
      }).then(updateExams);
    }
  };

  const deleteExam = () => {
    examService.deleteExam(examId)
      .then(updateExams);
    history.push('/exams');
  };

  if (!exam) {
    return <Spinner/>;
  }

  return <>
    <div className="exam-options font-poppins">
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: '150px'}}>
        <TitleLine title="Options" width="150%"/>
        <div className="column is-narrow" style={{width: '450px'}}>
          <section>
            <ExamName examName={examName}
              onChange={e => setExamName(e.target.value)}/>
          </section>
          <section>
            <ExamSchedule
              scheduleRef={examScheduleRef}
              startTime={startTime}
              endTime={endTime}
              setStartTime={setStartTime}
              setEndTime={setEndTime}/>
          </section>
          <section>
            <ExamWhiteList whitelist={whitelist} onWhitelistChange={setWhitelist}/>
          </section>
          <section>
            <button className="button update-button"
              onClick={onButtonUpdateChangeClick}>
                            Update Change
            </button>
          </section>
        </div>
        <div className="column right"/>
        <TitleLine title="Danger Zone" width="150%"/>
        <DangerZone onDangerButtonClick={() => setShowDeleteExamModal(true)}
          header="Delete this exam"
          description="Once you delete an exam, there is no going back. Please be certain."
          buttonName="Delete Exam"/>
      </div>

      <DeleteConfirmationModal title="Delete the Exam"
        data={[
          {
            title: 'Exam Name',
            value: exam.name
          }
        ]}
        show={showDeleteExamModal}
        onClose={() => setShowDeleteExamModal(false)}
        onSubmit={() => deleteExam()}/>
    </div>
  </>;
};


export {ExamOptions};
