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
    const [problemTabActiveIndex, setProblemTabActiveIndex] = useState(1);
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

    const ProblemFilterSearchBar = ({filterItems}) => {
        return (
            <div className="is-flex is-justify-content-center filterSearchBar">
                <div className="select">
                    <select>
                        {filterItems?.map(name => <option key={name}>{name}</option>)}
                    </select>
                </div>
                <input className="search" placeholder="&#xF002;" type="text"/>
                <CreateButton onClick={() => setShowCreateProblemModal(true)}/>
            </div>
        )
    };

    const ProblemTabs = () => {

        const onProblemsTabClick = () => {
            setProblemTabActiveIndex(1);
            problemService.getVisibleProblems()
                .then(setProblems);
        };

        const onInvisibleTabClick = () => {
            setProblemTabActiveIndex(2);
            problemService.getInvisibleProblems()
                .then(setProblems);
        };

        const onArchiveTabClick = () => {
            setProblemTabActiveIndex(3);
            problemService.getArchiveProblems()
                .then(setProblems);
        };

        return (
            <div className="tabs is-medium">
                <ul>
                    <li><a className={problemTabActiveIndex === 1 ? "is-Active" : ""}
                           onClick={onProblemsTabClick}>Problems</a></li>
                    <li><a className={problemTabActiveIndex === 2 ? "is-Active" : ""}
                           onClick={onInvisibleTabClick}>Invisible</a></li>
                    <li><a className={problemTabActiveIndex === 3 ? "is-Active" : ""}
                           onClick={onArchiveTabClick}>Archive</a></li>
                </ul>
            </div>
        )
    };

    if (!problems) {
        return <Spinner/>;
    }

    return <>
        <Route path="/problems" exact>
            <div className="problem-list font-poppins">
                <div>
                    <ProblemFilterSearchBar filterItems={["Filter", "Id", "tags"]}/>
                    <ProblemTabs/>
                    <ItemListPage width="1000px"
                                  showFilterSearchBar={false}
                                  tableHeaders={[
                                      "#",
                                      "Problem Title",
                                      "Tags"
                                  ]}
                                  tableRowGenerator={{
                                      list: problems,
                                      key: (problem) => problem.id,
                                      data: (problem) => [
                                          <p>{problem.id}</p>,
                                          <Link to={`problems/${problem.id}/edit`}
                                                style={{color: "#1273BA"}}>
                                              {problem.title}
                                          </Link>,
                                          <div className="tags are-small">
                                              {problem.tags?.map(tag =>
                                                  <span key={tag} className="problem-tag tag">{tag}</span>)}
                                          </div>
                                      ]
                                  }}
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
    </>
        ;
};


export {ProblemList};
