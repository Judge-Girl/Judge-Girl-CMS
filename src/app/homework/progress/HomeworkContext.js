import {createContext, useContext} from 'react';

export const HomeworkContext = createContext(null);

export const useHomeworkContext = () => {
	return useContext(HomeworkContext);
};
