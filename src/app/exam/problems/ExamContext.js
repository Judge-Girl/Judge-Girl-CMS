import {createContext, useContext} from "react";

export const ExamContext = createContext(null);

export const useExamContext = () => {
    return useContext(ExamContext)
}