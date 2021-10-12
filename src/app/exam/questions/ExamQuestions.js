/* eslint-disable react/jsx-key */
import './ExamQuestions.scss';
import React, {useCallback, useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {examService, submissionService} from '../../../services/services.js';
import {ThreeDotsButton} from '../../commons/buttons/ThreeDotsButton.js';
import {ItemListPage} from '../../commons/ItemListPage/ItemListPage.js';
import {AddQuestionModal} from '../modals/AddQuestionModal.js';
import {EditQuestionModal} from '../modals/EditQuestionModal.js';
import {RejudgeQuestionModal} from '../modals/RejudgeQuestionModal';
import {Spinner} from '../../commons/Spinner';
import {DeleteConfirmationModal} from '../../commons/modals/ConfirmationModal';
import ExamDescription from './ExamDescription';

const toCharacterIndex = i => {
  return String.fromCharCode(i + 65);
};

const ExamQuestions = () => {
  const NOT_SET = -1;
  const {examId} = useParams();
  const [exam, setExam] = useState(undefined);
  const [questions, setQuestions] = useState(undefined);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [showEditQuestionModal, setShowEditQuestionModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(undefined);
  const [showRejudgeQuestionModal, setShowRejudgeQuestionModal] = useState(NOT_SET);
  const [rejudgingProblemId, setRejudgeProblemId] = useState(NOT_SET);
  const [showDeleteQuestionModal, setShowDeleteQuestionModal] = useState(undefined);

  const fetchExam = useCallback(() => {
    examService.getExamOverview(examId)
      .then(exam => {
        exam.questions.sort((questionA, questionB) => questionA.questionOrder - questionB.questionOrder);
        setQuestions(exam.questions);
      });
  }, [examId, setQuestions]);

  useEffect(() => {
    if (!exam) {
      examService.getExam(examId)
        .then(setExam)
        .then(fetchExam);
    }
  }, [exam, examId, setExam, fetchExam]);

  const editQuestion = question => {
    return examService.editExamQuestion(question).then(fetchExam);
  };

  const deleteQuestion = question => {
    examService.deleteExamQuestion(question).then(fetchExam);
  };

  const dropDownItems = question => {
    return ([
      {
        name: 'Edit',
        dangerous: false,
        onClick: () => {
          setEditingQuestion(question);
          setShowEditQuestionModal(true);
        }
      },
      {
        name: 'Rejudge',
        dangerous: false,
        onClick: () => setShowRejudgeQuestionModal(question.problemId)
      },
      {
        name: 'Delete',
        dangerous: true,
        onClick: () => setShowDeleteQuestionModal(question)
      }
    ]);
  };

  const rejudgeQuestion = problemId => {
    setRejudgeProblemId(problemId);
    submissionService.rejudge({examId, problemId})
      .then(res => {
        console.log('Calling Rejudge API: and get result:', res);
        setRejudgeProblemId(NOT_SET);
      });
  };

  const addQuestion = question => {
    question.examId = examId;
    question.questionOrder = questions.length;
    return examService.addExamQuestion(question)
      .then(fetchExam);
  };

  if (!exam || !questions) {
    return <Spinner/>;
  }

  return (
    <div className="exam-questions font-poppins">
      <div className="exam-content">
        <ItemListPage
          width="1200px"
          title="Questions"
          tableHeaders={[
            '#',
            'Question',
            <p className="text-center">Score Percentage</p>,
            <p className="text-center">Submission Quota</p>,
            ' '
          ]}
          tableDataStyle={{height: '24px', padding: '5px 12px'}}
          tableRowGenerator={{
            list: questions,
            key: question => `${question.questionOrder}-${question.problemId}`,
            data: (question) => [
              <p>{toCharacterIndex(questions.findIndex(_question => _question.problemId === question.problemId))}</p>,
              <Link to={`../../problems/${question.problemId}/edit`}
                style={{color: '#1273BA'}}>{`${question.problemId} ${question.problemTitle}`}
              </Link>,
              <p className="text-center">{question.maxScore}</p>,
              <p className="text-center">{question.quota}</p>,
              <div>
                {rejudgingProblemId === question.problemId ?
                  <span className="tag">
                                                    Rejudging
                    <span className="waitingForConnection">.</span>
                    <span className="waitingForConnection2">.</span>
                    <span className="waitingForConnection3">.</span>
                  </span>
                  :
                  <div className="three-dot-button">
                    <ThreeDotsButton dropDownItems={dropDownItems(question)}/>
                  </div>
                }
                <RejudgeQuestionModal
                  show={showRejudgeQuestionModal === question.problemId}
                  title="Rejudge The Problem?"
                  question={question}
                  onClose={() => setShowRejudgeQuestionModal(NOT_SET)}
                  onConfirmRejudge={rejudgeQuestion}/>
              </div>
            ]
          }}
          showFilterSearchBar={false}/>
        <div className="add-question-btn"
          onClick={() => setShowAddQuestionModal(true)}>
          <span>Add New Question</span>
        </div>
        <ExamDescription examId={examId}
          buttonPos="down"/>
      </div>

      <AddQuestionModal
        title="Create Question"
        show={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        onSubmitQuestion={addQuestion}/>

      <EditQuestionModal title={'Edit Question'}
        show={showEditQuestionModal}
        question={editingQuestion}
        onClose={() => setShowEditQuestionModal(false)}
        onSubmitQuestion={editQuestion}/>
      {showDeleteQuestionModal ?
        <DeleteConfirmationModal title="Delete the Question?"
          data={[
            {
              title: 'Question Title',
              value: showDeleteQuestionModal?.problemTitle
            }
          ]}
          show={showDeleteQuestionModal}
          onClose={() => setShowDeleteQuestionModal(undefined)}
          onSubmit={() => deleteQuestion(showDeleteQuestionModal)}/> : undefined}

    </div>
  );
};


export default ExamQuestions;
