import {createContext, useContext} from "react";
import Problem from "../../../models/Problem";

export const Context = createContext(undefined);

export const useProblemEditorContext = () => {
    return useContext(Context);
};

export const ACTION_INITIALIZE = 'initialize';
export const ACTION_UPDATE_DESCRIPTION = 'updateDescription';

export function reducer(problem, action) {
    switch (action.type) {
        case ACTION_INITIALIZE:
            return action.problem;
        case ACTION_UPDATE_DESCRIPTION:
            return new Problem({...problem, description: action.description});
        default:
            throw new Error();
    }
}
