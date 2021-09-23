import "./ProblemList.scss";
import React, {useCallback, useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../commons/buttons/CreateButton";
import CreateProblemModal from "./Modal/CreateProblemModal";
import {problemService} from "../../services/services";
import {Spinner} from "../commons/Spinner";
import {Link, Route, useHistory} from "react-router-dom";
import ProblemEditor from "./editor/ProblemEditor";
import {ProblemEditorContext} from "./editor/ProblemEditorContext";


const ProblemList = () => {
    const history = useHistory();
    const [problems, setProblems] = useState(undefined);
    const [problemsDirty, setProblemsDirty] = useState(true);
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
    const fetchAllProblems = useCallback(() => {
        problemService.getAllProblems()
            .then(setProblems);
    }, [setProblems]);

    const markProblemsDirty = () => setProblemsDirty(true);

    useEffect(() => {
        if (!problems || problemsDirty) {
            fetchAllProblems();
            setProblemsDirty(false);
        }
    }, [problems, problemsDirty, fetchAllProblems]);

    const onProblemCreated = problemId => {
        fetchAllProblems();
        history.push(`/problems/${problemId}/edit`);
    };

    if (!problems)
        return <Spinner/>;

    return <>
        <Route path="/problems" exact>
            <div className="problem-list font-poppins">
                <div>
                    <ItemListPage title="Problem List"
                                  width="1000px"
                                  filterItems={["Filter", "Id", "tags"]}
                                  Button={() =>
                                      <CreateButton onClick={() => setShowCreateProblemModal(true)}/>}
                                  tableHeaders={[
                                      <div>#</div>,
                                      <div>Problem Title</div>,
                                      <div>Tags</div>
                                  ]}
                                  tableRowGenerator={{
                                      list: problems,
                                      key: (problem) => problem.id,
                                      data: (problem) => [
                                          <p>{problem.id}</p>,
                                          <Link to={`problems/${problem.id}/edit`}>{problem.title}</Link>,
                                          <div className="tags are-small">
                                              {problem.tags?.map(tag =>
                                                  <span key={tag} className="problem-tag tag">{tag}</span>)}
                                          </div>
                                      ]}}
                                  tableDataStyle={{textAlign: "left"}}/>
                    <CreateProblemModal show={showCreateProblemModal}
                                        onClose={() => setShowCreateProblemModal(false)}
                                        onProblemCreated={onProblemCreated}/>
                </div>
            </div>
        </Route>
        <Route path="/problems/:problemId/edit">
            <ProblemEditorContext.Provider
                value={{markProblemsDirty}}>
                <ProblemEditor/>
            </ProblemEditorContext.Provider>
        </Route>
    </>;
};


export {ProblemList};
