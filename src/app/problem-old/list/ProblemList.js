import React, {useCallback, useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import {Link, Route, useHistory} from "react-router-dom";
import {TableCell} from "../../../utils/TableCell";
import ProblemEditor from "../../problem/ProblemEditor";
import {ProblemEditorContext} from "../../problem/ProblemEditorContext";


const ProblemList = () => {
    const history = useHistory();
    const [problems, setProblems] = useState(undefined);
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
    const fetchProblems = useCallback(() => {
        problemService.getAllProblems().then(setProblems);
    }, [setProblems]);
    const [currentProblem, setCurrentProblem] = useState(undefined);

    useEffect(() => {
        if (!problems || problems.length === 0) {
            fetchProblems();
        }
    }, [problems, fetchProblems]);

    const onProblemCreated = problemId => {
        fetchProblems();
        history.push(`/problems/${problemId}/edit`);
    }

    if (!problems) {
        return <Spinner/>;
    }

    return <>
        <Route path="/problems" exact>
            <div className="problem-list font-poppins">
                <div style={{paddingTop: "20px", paddingBottom: "150px"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <ItemListPage title="Problem List"
                                      width="1000px"
                                      filterItems={["Filter", "Id", "tags"]}
                                      Button={() =>
                                          <CreateButton onClick={() => setShowCreateProblemModal(true)}/>}
                                      tableHeaders={[
                                          <TableCell>#</TableCell>,
                                          <TableCell>Problem Title</TableCell>,
                                          <TableCell>Tags</TableCell>
                                      ]}
                                      tableRowGenerator={{
                                          list: problems,
                                          key: (problem) => problem.id,
                                          data: (problem) => [
                                              <TableCell>
                                                  <p>{problem.id}</p>
                                              </TableCell>,
                                              <TableCell>
                                                  <Link to={`problems/${problem.id}/edit`}
                                                        onClick={setCurrentProblem(undefined)}>
                                                      {problem.title}</Link>
                                              </TableCell>,
                                              <TableCell>
                                                  <span className="tag is-link">Functions</span>
                                              </TableCell>,
                                          ]
                                      }}
                                      tableDataStyle={{textAlign: "left"}}/>
                        <CreateProblemModal show={showCreateProblemModal}
                                            onClose={() => setShowCreateProblemModal(false)}
                                            onProblemCreated={onProblemCreated}/>
                    </div>
                </div>
            </div>
        </Route>
        <Route path="/problems/:problemId/edit">
            <ProblemEditorContext.Provider
                value={{fetchProblems, currentProblem, setCurrentProblem}}>
                <ProblemEditor/>
            </ProblemEditorContext.Provider>
        </Route>
    </>;
};


export {ProblemList};
