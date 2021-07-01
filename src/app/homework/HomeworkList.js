import React, {useCallback, useEffect, useState} from "react";
import {homeworkService} from "../../services/services";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {Spinner} from "../commons/Spinner";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {EmptyCell, TableCell} from "../../utils/TableCell";
import FakeLink from "../commons/FakeLink";
import {DeleteConfirmationModal} from "../commons/modals/DeleteConfirmationModal.js";
import {CreateButton} from "../commons/buttons/CreateButton";
import {CreateHomeworkModal} from "./modals/CreateHomeworkModal";

const HomeworkList = () => {
    const [showCreateHomeworkModal, setShowCreateHomeworkModal] = useState(false);
    const [homeworkList, setHomeworkList] = useState(undefined);
    const [selectedHomework, setSelectedHomework] = useState(undefined);
    const [showDeleteHomeworkConfirmationModal, setShowDeleteHomeworkConfirmationModal] = useState(false);
    const refetchHomework = useCallback(() => {
        homeworkService.getAllHomework()
            .then(setHomeworkList)
    }, [setHomeworkList]);

    useEffect(() => {
        if (!homeworkList || homeworkList.length === 0) {
            refetchHomework();
        }
    }, [homeworkList, refetchHomework]);

    const onHomeworkCreated = () => {
        refetchHomework();
    };

    if (!homeworkList) {
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
                                      <FakeLink>{homework.name}</FakeLink>,
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
    );
};

export {HomeworkList};
