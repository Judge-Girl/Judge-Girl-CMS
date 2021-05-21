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
    const {problems, setProblems, addProblem} = useProblemList();
    const [currentProblem, setCurrentProblem] = useState();
    const [shouldRedirect, setShouldRedirect] = useState(false)
    const setCurrentProblemById = useCallback((problemId) => {
            setCurrentProblem(problems.find(problem => parseInt(problem.id) === parseInt(problemId)))
    }, [problems, setCurrentProblem])
    const refetchProblem = useCallback((problemId) => {
        problemService.getAllProblems()
            .then(problems => {
                setProblems(problems)
                setCurrentProblemById(problemId)
            })
    }, [setProblems, setCurrentProblemById])

    useEffect(() => {
        if (!problems || problems.length === 0) {
            refetchProblem()
        }
    }, [problems, refetchProblem]);

    const onProblemCreated = (problem) => {
        addProblem(problem)
        setCurrentProblem(problem)
        setShouldRedirect(true)
    }

    if (shouldRedirect) {
        return <Redirect to={`/problems/${currentProblem.id}/edit`}/>
    }

    if (!problems) {
        return <Spinner/>
    }

    return (
        <>
            <Route path="/problems" exact>
                <div className="problem-list font-poppins">
                    <div style={{paddingTop: "20px"}}>
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
                                                            onClick={() => {setCurrentProblemById(problem.id)}}>
                                                          {problem.id}</Link>
                                                  </TableCell>,
                                                  <TableCell>
                                                      <Link to={`/problems/${problem.id}/edit`}
                                                            onClick={() => {setCurrentProblemById(problem.id)}}>
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
            <ProblemContext.Provider value={{currentProblem, setCurrentProblem, refetchProblem}}>
                <Route path="/problems/:problemId/edit">
                    <ProblemEditor/>
                </Route>
            </ProblemContext.Provider>
        </>
    )
}


export {ProblemList};