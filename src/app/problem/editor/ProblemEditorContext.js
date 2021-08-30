import {createContext, useContext} from "react";

export const ProblemEditorContext = createContext(undefined);

export const useProblemEditorContext = () => {
    return useContext(ProblemEditorContext);
};

