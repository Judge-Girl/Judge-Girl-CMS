import React, {useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import FakeLink from "../../commons/FakeLink";
import {ProblemEditor} from "../ProblemEditor";
import {Route} from "react-router-dom";
import {TableCell} from "../../../utils/TableCell";

export const useProblemList = () => {
    const [problems, setProblems] = useState(undefined);
    const addProblem = (problem) => {
        problems.push(problem);
        setProblems(problems);
    };

    return {problems, setProblems, addProblem}
};

const ProblemList = () => {
    const [showCreateProblemModal, setShowCreateProblemModal] = useState(false)
    const {problems, setProblems, addProblem} = useProblemList();

    useEffect(() => {
        if (!problems || problems.length === 0) {
            problemService.getAllProblems()
                .then(problems => {
                    setProblems(problems);
                })
        }
    });

    const onProblemCreated = (problem) => {
        addProblem(problem)
    }


    if (!problems) {
        return (
            <Spinner/>
        )
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
                                          Button={() => new CreateButton({
                                              onCreateButtonClick: () => setShowCreateProblemModal(true)
                                          })}
                                          tableHeaders={[
                                              <TableCell>#</TableCell>,
                                              <TableCell>Problem Title</TableCell>,
                                              <TableCell>Tags</TableCell>
                                          ]}
                                          tableRowGenerator={{
                                              list: problems,
                                              key: (problem) => problem.id,
                                              data: (problem) => [
                                                  <FakeLink>{problem.id}</FakeLink>,
                                                  <FakeLink>{problem.title}</FakeLink>,
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
                <ProblemEditor/>
            </Route>
        </>

    )
}


export {ProblemList};