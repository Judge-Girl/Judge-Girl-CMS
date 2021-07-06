import React, {useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import {ProblemEditor} from "../ProblemEditor";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import {TableCell} from "../../../utils/TableCell";

const ProblemList = () => {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false);
    const [problems, setProblems] = useState(undefined);
    const [currentProblemId, setCurrentProblemId] = useState(undefined);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const onProblemCreated = (problemId) => {
        fetchProblems();
        setCurrentProblemId(problemId);
        setShouldRedirect(true);
    };

    const fetchProblems = () => {
        problemService.getAllProblems()
            .then(problems => setProblems(problems));
    }

    useEffect(() => {
        if (!problems) {
            fetchProblems();
        }
    });

    if (!problems) {
        return <Spinner/>
    }

    /* TODO: The commented code below is problematic, error message: "a component is changing an uncontrolled input to be controlled"
    if (shouldRedirect) {
        return (<Redirect to={`problems/${currentProblemId}/edit`}/>);
    }
     */

    return (
        <>
            {shouldRedirect ? <Redirect to={`problems/${currentProblemId}/edit`}/> : ""}
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
                                                      <Link to={`/problems/${problem.id}/edit`}>
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
                                                onProblemCreated={problemId => onProblemCreated(problemId)}/>
                        </div>
                    </div>
                </div>
            </Route>

            <Switch>
                <Route path="/problems/:problemId/edit">
                    <ProblemEditor/>
                </Route>
            </Switch>
        </>
    )
};


export {ProblemList};
