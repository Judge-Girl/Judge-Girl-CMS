import {createContext, useContext} from "react";

export const ProblemEditorContext = createContext(null);

export const useProblemEditorContext = () => {
    return useContext(ProblemEditorContext);
};

