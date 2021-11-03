import {createContext, useContext} from 'react';

export const ExamContext = createContext(undefined);

export const useExamContext = () => {
  return useContext(ExamContext);
};
