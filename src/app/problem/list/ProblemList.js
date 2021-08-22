import React, {useCallback, useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import {ProblemEditor} from "../ProblemEditor";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {TableCell} from "../../../utils/TableCell";
import ProblemEditor2 from "../../problem2/ProblemEditor2";

const ProblemList = () => {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
    const [problems, setProblems] = useState(undefined);
    // TODO: The currentProblemId is not reset to undefined when in ProblemEditor2.
    const [currentProblemId, setCurrentProblemId] = useState(undefined);
    const fetchProblems = useCallback(problemId => {
        problemService.getAllProblems()
            .then(problems => {
                setProblems(problems);
                setCurrentProblemId(problemId);
            });
    }, [setProblems, setCurrentProblemId]);

    useEffect(() => {
        if (!problems || problems.length === 0) {
            fetchProblems();
        }
    }, [problems, fetchProblems]);

    /* TODO: The commented code below is problematic, error message: "a component is changing an uncontrolled input to be controlled"
    if (shouldRedirect) {
        return (<Redirect to={`problems/${currentProblemId}/edit`}/>);
    }
    This problem has been resolved by removing the unnecessary flag shouldRedirect.
    This should be deleted after review.
    */

    if (!problems) {
        return <Spinner/>;
    }

    return (
        <>{currentProblemId?
            <Redirect to={`problems/${currentProblemId}/edit2`}/>: ""}
            <Switch>
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
                                                          <Link to={`problems/${problem.id}/edit2`}>
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
                                                    onProblemCreated={problemId => fetchProblems(problemId)}/>
                            </div>
                        </div>
                    </div>
                </Route>
                <Route path="/problems/:problemId/edit">
                    <ProblemEditor/>
                </Route>
                <Route path="/problems/:problemId/edit2">
                    <ProblemEditor2 clearParentFlag/>
                </Route>
            </Switch>
        </>
    )
};


export {ProblemList};
