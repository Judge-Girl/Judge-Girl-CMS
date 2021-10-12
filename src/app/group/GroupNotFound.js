import NotFoundPage from '../commons/notFoundPage/NotFoundPage';
import React, {useState} from 'react';
import {Redirect} from 'react-router-dom';

const GroupNotFound = () => {
	const [shouldRedirect, setShouldRedirect] = useState(false);

	if (shouldRedirect) {
		return (<Redirect to={'/groups'}/>);
	}

	return (
		<NotFoundPage
			errorMsg={['We can not find this group !', 'If you find this wrong, please contact the admin.']}
			onGoBackClick={() => setShouldRedirect(true)}/>
	);
};

export default GroupNotFound;
