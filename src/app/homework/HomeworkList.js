import React, {useCallback, useEffect, useState} from "react";
import {homeworkService} from "../../services/services";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {Spinner} from "../commons/Spinner";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {EmptyCell, TableCell} from "../../utils/TableCell";
import {DeleteConfirmationModal} from "../commons/modals/DeleteConfirmationModal.js";
import {CreateButton} from "../commons/buttons/CreateButton";
import {CreateHomeworkModal} from "./modals/CreateHomeworkModal";
import {Link, Redirect, Route, Switch} from "react-router-dom";
import HomeworkProgressPage from "./progress/HomeworkProgressPage";
import {HomeworkContext} from "./progress/HomeworkContext";

const HomeworkList = () => {
    const [showCreateHomeworkModal, setShowCreateHomeworkModal] = useState(false);
    const [homeworkList, setHomeworkList] = useState(undefined);
    const [selectedHomework, setSelectedHomework] = useState(undefined);
    const [currentHomework, setCurrentHomework] = useState(undefined);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [showDeleteHomeworkConfirmationModal, setShowDeleteHomeworkConfirmationModal] = useState(false);
    const refetchHomework = useCallback((homeworkId) => {
        homeworkService.getAllHomework()
            .then(homeworkList => {
                setHomeworkList(homeworkList);
                setCurrentHomework(homeworkList.find(homework => parseInt(homework.id) === parseInt(homeworkId)));
            })
    }, [setHomeworkList,setCurrentHomework]);

    useEffect(() => {
        if (!homeworkList || homeworkList.length === 0) {
            refetchHomework();
        }
    }, [homeworkList, refetchHomework]);

    const onHomeworkCreated = () => {
        refetchHomework();
    };

    if (!homeworkList || (shouldRedirect && !currentHomework)) {
        return <Spinner/>;
    }

    const deleteHomework = (homeworkId) => {
        homeworkService.deleteHomework(homeworkId)
            .then(() => setHomeworkList(homeworkList.filter(homework => homework.id !== homeworkId)));
    };

    const actionItemsButton = ({homework}) =>
        <ThreeDotsButton dropDownItems={[
            {
                name: "Delete",
                dangerous: true,
                onClick: () => {
                    setShowDeleteHomeworkConfirmationModal(true)
                    setSelectedHomework(homework)
                }
            },
        ]}/>

    return (
        <>{shouldRedirect ?
            <Redirect to={`/homework/${currentHomework.id}/homework`}/> : ""}
            <Route path="/homework" exact>
                <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <ItemListPage width="1200px"
                                      title="Homework"
                                      filterItems={["Filter", "Homework Name", "Problem IDs"]}
                                      Button={() =>
                                          <CreateButton onClick={() => setShowCreateHomeworkModal(true)}/>}
                                      tableHeaders={[
                                          <TableCell>#</TableCell>,
                                          <TableCell>Homework Name</TableCell>,
                                          <TableCell>Problem IDs</TableCell>,
                                          <EmptyCell/>
                                      ]}
                                      tableRowGenerator={{
                                          list: homeworkList,
                                          key: homework => homework.id,
                                          data: homework => [
                                              <TableCell>{homework.id}</TableCell>,
                                              <Link to={`/homework/${homework.id}/homework`}
                                                    onClick={() => setCurrentHomework(homework)}>
                                                  {homework.name}</Link>,
                                              <TableCell>{homework.problemIds.join(', ')}</TableCell>,
                                              <TableCell>{actionItemsButton({homework})}</TableCell>,
                                          ]
                                      }}/>

                        <CreateHomeworkModal show={showCreateHomeworkModal}
                                             onClose={() => setShowCreateHomeworkModal(false)}
                                             onHomeworkCreated={onHomeworkCreated}/>

                        <DeleteConfirmationModal title={"Delete this homework"}
                                                 data={[
                                                     {
                                                         title: "Homework Name",
                                                         value: selectedHomework?.name
                                                     }
                                                 ]}
                                                 show={showDeleteHomeworkConfirmationModal}
                                                 onClose={() => setShowDeleteHomeworkConfirmationModal(false)}
                                                 onSubmit={() => deleteHomework(selectedHomework.id)}/>
                    </div>
                </div>

            </Route>
            <HomeworkContext.Provider value={{currentHomework, setCurrentHomework, refetchHomework, setShouldRedirect}}>
                <Switch>
                    <Route path="/homework/:homeworkId/homework">
                        <HomeworkProgressPage/>
                    </Route>
                </Switch>
            </HomeworkContext.Provider>
        </>
    )
};
export {HomeworkList}
