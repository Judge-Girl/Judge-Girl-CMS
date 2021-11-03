import './ProblemList.scss';
import React, {createContext, useCallback, useContext, useEffect, useState} from 'react';
import {ItemListPage} from '../commons/ItemListPage/ItemListPage';
import {CreateButton} from '../commons/buttons/CreateButton';
import CreateProblemModal from './modals/CreateProblemModal';
import {problemService} from '../../services/services';
import {Spinner} from '../commons/Spinner';
import {Link, Route, useHistory} from 'react-router-dom';
import ProblemEditorRoot from './editor/ProblemEditorRoot';

export const ProblemContext = createContext(undefined);

export const useProblemContext = () => {
  return useContext(ProblemContext);
};

const ProblemList = () => {
  const history = useHistory();
  const [problems, setProblems] = useState(undefined);
  const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
  const [problemTabActive, setProblemTabActive] = useState('Problems');
  const fetchProblems = useCallback(() => {
    switch (problemTabActive) {
    case 'Problems':
      problemService.getNonArchivedAndVisibleProblems()
        .then(setProblems);
      break;
    case 'Invisible':
      problemService.getNonArchivedAndInvisibleProblems()
        .then(setProblems);
      break;
    case 'Archive':
      problemService.getArchiveProblems()
        .then(setProblems);
      break;
    }
  }, [problemTabActive]);

  useEffect(() => {
    if (!problems) {
      fetchProblems();
    }
  }, [problems]);

  useEffect(() => {
    fetchProblems();
  }, [problemTabActive]);

  const onProblemCreated = problem => {
    fetchProblems();
    history.push(`/problems/${problem.id}/edit`);
  };

  const ProblemFilterSearchBar = ({filterItems}) => {
    return (
      <div className="is-flex is-justify-content-center filterSearchBar">
        <select className="select">
          {filterItems?.map(name => <option key={name}>{name}</option>)}
        </select>
        <input className="search" placeholder="&#xF002;" type="text"/>
        <CreateButton onClick={() => setShowCreateProblemModal(true)}/>
      </div>
    );
  };

  const ProblemTabs = () => {
    return (
      <div className="tabs is-medium">
        <ul>
          <li><a className={problemTabActive === 'Problems' ? 'is-Active' : ''}
            onClick={() => setProblemTabActive('Problems')}>Problems</a></li>
          <li><a className={problemTabActive === 'Invisible' ? 'is-Active' : ''}
            onClick={() => setProblemTabActive('Invisible')}>Invisible</a></li>
          <li><a className={problemTabActive === 'Archive' ? 'is-Active' : ''}
            onClick={() => setProblemTabActive('Archive')}>Archive</a></li>
        </ul>
      </div>
    );
  };

  if (!problems) {
    return <Spinner/>;
  }

  return <>
    <Route path="/problems" exact>
      <div className="problem-list font-poppins">
        <div>
          <ProblemFilterSearchBar filterItems={['Filter', 'Id', 'tags']}/>
          <ProblemTabs/>
          <ItemListPage width="1000px"
            showFilterSearchBar={false}
            tableHeaders={[
              '#',
              'Problem Title',
              'Tags'
            ]}
            tableRowGenerator={{
              list: problems,
              key: (problem) => problem.id,
              data: (problem) => [
                <p key={problem.id}>{problem.id}</p>,
                <Link key={problem.title} to={`problems/${problem.id}/edit`}
                  style={{color: '#1273BA'}}>
                  {problem.title}
                </Link>,
                <div key={`${problem.id}-tags`} className="tags are-small">
                  {problem.tags?.map(tag =>
                    <span key={tag} className="problem-tag tag">{tag}</span>)}
                </div>
              ]
            }}
            tableDataStyle={{textAlign: 'left'}}/>
          <CreateProblemModal show={showCreateProblemModal}
            onClose={() => setShowCreateProblemModal(false)}
            onProblemCreated={onProblemCreated}/>
        </div>
      </div>
    </Route>
    <ProblemContext.Provider value={{fetchProblems}}>
      <Route path="/problems/:problemId/edit">
        <ProblemEditorRoot/>
      </Route>
    </ProblemContext.Provider>
  </>;
};


export {ProblemList};
