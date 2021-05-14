import React, {useEffect, useState} from "react";
import {ItemListPage} from "../../commons/ItemListPage/ItemListPage";
import {CreateButton} from "../../commons/buttons/CreateButton";
import CreateProblemModal from "../Modal/CreateProblemModal";
import {problemService} from "../../../services/services";
import {Spinner} from "../../commons/Spinner";
import FakeLink from "../../commons/FakeLink";

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
        <div style={{padding: "20px 100px 20px 100px"}}>
            <div className="container font-poppins">
                <ItemListPage title="Problem List"
                              filterItems={["Filter", "Id", "tags"]}
                              Button={() => new CreateButton({
                                  onCreateButtonClick: () => setShowCreateProblemModal(true)
                              })}
                              tableHeaders={["#", "Problem Title", "Tags"]}
                              tableRowGenerator={{
                                  list: problems,
                                  key: (problem) => problem.id,
                                  data: (problem) => [
                                      problem.id,
                                      <FakeLink content={problem.title}/>,
                                      <span className="tag is-link">Functions</span>
                                  ]
                              }}
                              tableDataStyle={{ textAlign: "left" }}/>
                <CreateProblemModal show={showCreateProblemModal}
                                    onClose={() => setShowCreateProblemModal(false)}
                                    onProblemCreated={onProblemCreated}/>
            </div>
        </div>
    )
}


export {ProblemList};