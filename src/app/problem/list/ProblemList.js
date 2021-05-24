import React, {useCallback, useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import {ProblemEditor} from "../ProblemEditor";
import {Link, Redirect, Route} from "react-router-dom";
import {TableCell} from "../../../utils/TableCell";
import {ProblemContext} from "./ProblemContext";

export const useProblemList = () => {
    const [problems, setProblems] = useState();
    const addProblem = (problem) => {
        problems.push(problem);
        setProblems(problems);
    };

    return {problems, setProblems, addProblem}
};

const ProblemList = () => {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false)
    const {problems, setProblems} = useProblemList();
    const [currentProblem, setCurrentProblem] = useState();
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const refetchProblem = useCallback((problemId) => {
        problemService.getAllProblems()
            .then(problems => {
                setProblems(problems)
                setCurrentProblem(problems.find(problem => parseInt(problem.id) === parseInt(problemId)))
            })
    }, [setProblems, setCurrentProblem])

    useEffect(() => {
        if (!problems || problems.length === 0) {
            refetchProblem()
        }
    }, [problems, refetchProblem]);

    const onProblemCreated = (problemId) => {
        refetchProblem(problemId)
        setShouldRedirect(true)
    }

    if (!problems || (shouldRedirect && !currentProblem)) {
        return <Spinner/>
    }

    return (
        <>{shouldRedirect?
            <Redirect to={`problems/:problemId/edit`}/> : ""}
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
                                                      <Link to={`/problems/${problem.id}/edit`}
                                                            onClick={() => setCurrentProblem(problem)}>
                                                          {problem.id}</Link>
                                                  </TableCell>,
                                                  <TableCell>
                                                      <Link to={`/problems/${problem.id}/edit`}
                                                            onClick={() => setCurrentProblem(problem)}>
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
                <ProblemContext.Provider value={{
                    currentProblem, setCurrentProblem, refetchProblem, setShouldRedirect}}>
                    <ProblemEditor/>
                </ProblemContext.Provider>
            </Route>
        </>
    )
}


export {ProblemList};