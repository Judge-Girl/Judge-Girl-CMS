import {createContext, useContext} from "react";

export const ProblemContext = createContext(null);

export const useProblemContext = () => {
    return useContext(ProblemContext)
}