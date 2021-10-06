import {createContext, useContext} from "react";
import Problem from "../../../models/Problem";

export const Context = createContext(undefined);

export const useProblemEditorContext = () => {
    return useContext(Context);
};

export const ACTION_INITIALIZE = 'initialize';
export const ACTION_UPDATE_DESCRIPTION = 'updateDescription';
export const ACTION_UPDATE_VISIBILITY = 'updateVisibility';
export const ACTION_UPDATE_COMPILATION = 'updateCompilation';
export const ACTION_UPDATE_LANGUAGE_ENV = 'updateLanguageEnv';

export function reducer(problem, action) {
    switch (action.type) {
        case ACTION_INITIALIZE:
            return action.problem;
        case ACTION_UPDATE_DESCRIPTION:
            return new Problem({...problem, description: action.description});
        case ACTION_UPDATE_VISIBILITY:
            return new Problem({...problem, visible: action.visible});
        case ACTION_UPDATE_COMPILATION:
            const languageName = action.languageName;
            return new Problem({
                ...problem,
                languageEnvs: updateLanguageEnv(problem.languageEnvs, languageName,
                    languageEnv => {
                        return {...languageEnv, compilation: action.compilation};
                    })
            });
        case ACTION_UPDATE_LANGUAGE_ENV:
            return new Problem({
                ...problem,
                languageEnvs: updateLanguageEnv(problem.languageEnvs, action.languageEnv)
            });
        default:
            throw new Error();
    }
}

function updateLanguageEnv(languageEnvs, languageEnv) {
    for (let i = 0; i < languageEnvs.length; i++) {
        if (languageEnvs[i].name === languageEnv.name) {
            languageEnvs[i] = languageEnv;
            break;
        }
    }
    return languageEnvs;
}
