import {createContext, useContext} from 'react';

export const GroupContext = createContext(null);

export const useGroupContext = () => {
	return useContext(GroupContext);
};
