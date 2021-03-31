import React, {useEffect, useState} from "react";
import {ItemListPage} from "../commons/ItemListPage/ItemListPage";
import {studentService} from "../../services/services";
import FakeLink from "../commons/FakeLink";
import {CreateAdminAccountModal} from "./CreateAdminAccountModal";

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
        <div style={{padding: "40px 100px 20px 100px"}}>
            <ItemListPage title="Admin List"
                          filterItems={["Filter", "Name", "Email"]}
                          onCreateButtonClick={() => setShowCreateAdminAccountModal(true)}
                          tableHeaders={["Name", "Email", " "]}
                          tableRowGenerator={{
                              list: admins,
                              key: (admin) => admin.id,
                              data: (admin) => [
                                  (<FakeLink content={admin.name}/>),
                                  admin.email,
                                  ""
                              ]
                          }}
                          tableDataStyle={{textAlign: "left"}}/>

            <CreateAdminAccountModal show={showCreateAdminAccountModal}
                                     onClose={() => setShowCreateAdminAccountModal(false)}
                                     onAdminCreated={student => addAdmin(student)}/>
        </div>
    )
};


export {AdminList};
