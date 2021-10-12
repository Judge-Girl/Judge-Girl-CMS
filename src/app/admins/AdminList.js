import React, {useEffect, useState} from 'react';
import {ItemListPage} from '../commons/ItemListPage/ItemListPage';
import {studentService} from '../../services/services';
import FakeLink from '../commons/FakeLink';
import {CreateAdminAccountModal} from './CreateAdminAccountModal';
import {CreateButton} from '../commons/buttons/CreateButton';
import {EmptyCell, TableCell} from '../../utils/TableCell';

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
			<div style={{paddingTop: '20px', paddingBottom: '150px'}}>
				<div style={{display: 'flex', justifyContent: 'center'}}>
					<ItemListPage title="Admin List"
						width="700px"
						filterItems={['Filter', 'Name', 'Email']}
						Button={() =>
							<CreateButton onClick={() => setShowCreateAdminAccountModal(true)}/>}
						tableHeaders={[
							<TableCell key="name">Name</TableCell>,
							<TableCell key="email">Email</TableCell>,
							<EmptyCell key="empty"/>
						]}
						tableRowGenerator={{
							list: admins,
							key: (admin) => admin.id,
							data: (admin) => [
								<FakeLink key={admin.name}>{admin.name}</FakeLink>,
								<FakeLink key={admin.email}>{admin.email}</FakeLink>,
								<EmptyCell key="empty"/>
							]
						}}
						tableDataStyle={{textAlign: 'left'}}/>
					<CreateAdminAccountModal show={showCreateAdminAccountModal}
						onClose={() => setShowCreateAdminAccountModal(false)}
						onAdminCreated={student => addAdmin(student)}/>
				</div>
			</div>
		</div>
	);
};


export {AdminList};
