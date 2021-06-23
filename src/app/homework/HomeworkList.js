import React, {useCallback, useEffect, useState} from "react";
import {homeworkService} from "../../services/services";
import {ThreeDotsButton} from "../commons/buttons/ThreeDotsButton";
import {Spinner} from "../commons/Spinner";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {EmptyCell, TableCell} from "../../utils/TableCell";
import FakeLink from "../commons/FakeLink";
import {RemoveConfirmationModal} from "../commons/modals/RemoveConfirmationModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {CreateHomeworkModal} from "./modals/CreateHomeworkModal";

const HomeworkList = () => {
    const [showCreateHomeworkModal, setShowCreateHomeworkModal] = useState(false);
    const [homeworkList, setHomeworkList] = useState(undefined);
    const [selectedHomework, setSelectedHomework] = useState(undefined);
    const [showRemoveHomeworkConfirmationModal, setShowRemoveHomeworkConfirmationModal] = useState(false);
    const refetchHomework = useCallback(() => {
        homeworkService.getAllHomework()
            .then(homeworkList => {
                setHomeworkList(homeworkList);
            })
    }, [setHomeworkList]);

    useEffect(() => {
        if (!homeworkList || homeworkList.length === 0) {
            refetchHomework()
        }
    }, [homeworkList, refetchHomework]);

    const onHomeworkCreated = () => {
    };

    if (!homeworkList) {
        return <Spinner/>
    }

    const actionItemsButton = ({homework}) =>
        <ThreeDotsButton dropDownItems={[
            {
                name: "Remove",
                dangerous: true,
                onClick: () => {
                    setShowRemoveHomeworkConfirmationModal(true)
                    setSelectedHomework(homework)
                }
            },
        ]}/>

    return (
        <div className="font-poppins" style={{paddingTop: "20px", paddingBottom: "150px"}}>
            <div style={{display: "flex", justifyContent: "center"}}>
                <ItemListPage width="1200px"
                              title="Homework"
                              filterItems={["Filter", "Homework Name", "Problem IDS"]}
                              Button={() =>
                                  <CreateButton onClick={() => setShowCreateHomeworkModal(true)}/>}
                              tableHeaders={[
                                  <TableCell>#</TableCell>,
                                  <TableCell>Homework Name</TableCell>,
                                  <TableCell>Problem IDS</TableCell>,

                                  <EmptyCell/>
                              ]}
                              tableRowGenerator={{
                                  list: homeworkList,
                                  key: (homework) => homework.id,
                                  data: (homework) => [
                                      <TableCell>{homework.id}</TableCell>,
                                      <FakeLink>{homework.name}</FakeLink>,
                                      <TableCell>{homework.problemIds.join(', ')}</TableCell>,
                                      <TableCell>{actionItemsButton({homework: homework})}</TableCell>,
                                  ]
                              }}/>

                <CreateHomeworkModal show={showCreateHomeworkModal}
                                     onClose={() => setShowCreateHomeworkModal(false)}
                                     onHomeworkCreated={onHomeworkCreated}/>

                <RemoveConfirmationModal title={"Delete this homework"}
                                         data={[
                                             {
                                                 title: "Homework Name",
                                                 value: selectedHomework?.name
                                             }
                                         ]}
                                         show={showRemoveHomeworkConfirmationModal}
                                         onClose={() => setShowRemoveHomeworkConfirmationModal(false)}
                />

            </div>
        </div>
    );
};

export {HomeworkList};
