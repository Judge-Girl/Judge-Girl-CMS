import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateAdminAccountModal} from "./CreateAdminAccountModal";
import {CreateButton} from "../commons/buttons/CreateButton";
import {EmptyCell, TableCell} from "../../utils/TableCell";

const useAdminList = () => {
    const [admins, setAdmins] = useState(undefined);
    const addAdmin = (admin) => admins.push(admin);
    return {admins, addAdmin, setAdmins};

};

const AdminList = () => {
    const [showCreateAdminAccountModal, setShowCreateAdminAccountModal] = useState(false);
    const {admins, addAdmin, setAdmins} = useAdminList();

    useEffect(() => {
        if (!admins) {
            studentService.getAdmins({skip: 0, size: 100})
                .then(admins => setAdmins(admins));
        }
    });
    return (
        <div className="admin-list font-poppins">
            <div style={{paddingTop: "20px"}}>
                <div style={{display: "flex", justifyContent: "center"}}>
                    <ItemListPage title="Admin List"
                                  width="700px"
                                  filterItems={["Filter", "Name", "Email"]}
                                  Button={() => new CreateButton({
                                      onCreateButtonClick: () => setShowCreateAdminAccountModal(true)
                                  })}
                                  tableHeaders={[
                                      <TableCell>Name</TableCell>,
                                      <TableCell>Email</TableCell>,
                                      <EmptyCell/>
                                  ]}
                                  tableRowGenerator={{
                                      list: admins,
                                      key: (admin) => admin.id,
                                      data: (admin) => [
                                          <FakeLink>{admin.name}</FakeLink>,
                                          <FakeLink>{admin.email}</FakeLink>,
                                          <EmptyCell/>
                                      ]
                                  }}
                                  tableDataStyle={{textAlign: "left"}}/>
                    <CreateAdminAccountModal show={showCreateAdminAccountModal}
                                             onClose={() => setShowCreateAdminAccountModal(false)}
                                             onAdminCreated={student => addAdmin(student)}/>
                </div>
            </div>
        </div>
    )
};


export {AdminList};
