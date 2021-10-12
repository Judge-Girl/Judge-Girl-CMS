import './ProblemEditorRoot.scss';
import SectionNavigationBar from './SectionNavigationBar';
import ProblemEditor from './ProblemEditor';
import {ACTION_INITIALIZE, Context} from '../editor/context';
import {problemService} from '../../../services/services';
import {useParams} from 'react-router';
import React, {useEffect, useReducer} from 'react';
import {reducer} from './context';


const ProblemEditorRoot = () => {
  const {problemId} = useParams();
  const [problem, dispatch] = useReducer(reducer, undefined);

  useEffect(() => {
    if (!problem) {
      problemService.getProblemById(problemId)
        .then(problem => dispatch({type: ACTION_INITIALIZE, problem}));
    }
  });

  return <>
    <Context.Provider value={{problem, dispatch}}>
      <div id="problem-editor-root" >
        <SectionNavigationBar/>
        <ProblemEditor/>
      </div>
    </Context.Provider>
  </>;
};

export default ProblemEditorRoot;
