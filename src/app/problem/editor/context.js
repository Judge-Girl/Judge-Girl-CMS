import {createContext, useContext} from "react";
import Problem from "../../../models/Problem";

export const Context = createContext(undefined);

export const useProblemEditorContext = () => {
    return useContext(Context);
};

export const ACTION_INITIALIZE = 'initialize';
export const ACTION_UPDATE_TITLE = 'updateTitle';
export const ACTION_UPDATE_TAGS = 'updateTags';
export const ACTION_UPDATE_DESCRIPTION = 'updateDescription';
export const ACTION_UPDATE_VISIBILITY = 'updateVisibility';
export const ACTION_UPDATE_ARCHIVED = 'updateArchived';
export const ACTION_UPDATE_COMPILATION = 'updateCompilation';
export const ACTION_UPDATE_PROVIDEDCODES = 'updateProvidedCodes';
export const ACTION_UPDATE_LANGUAGE_ENV = 'updateLanguageEnv';
export const ACTION_DELETE = 'delete';

export function reducer(problem, action) {
    switch (action.type) {
        case ACTION_INITIALIZE:
            return action.problem;
        case ACTION_UPDATE_TITLE:
            return newProblem({...problem, title: action.title});
        case ACTION_UPDATE_TAGS:
            return newProblem({...problem, tags: action.tags});
        case ACTION_UPDATE_DESCRIPTION:
            return newProblem({...problem, description: action.description});
        case ACTION_UPDATE_VISIBILITY:
            return newProblem({...problem, visible: action.visible});
        case ACTION_UPDATE_ARCHIVED:
            return newProblem({...problem, archived: true});
        case ACTION_UPDATE_COMPILATION:
        case ACTION_UPDATE_LANGUAGE_ENV:
        case ACTION_UPDATE_PROVIDEDCODES:
            return newProblem({
                ...problem,
                languageEnvs: updateLanguageEnv(problem.languageEnvs, action.languageEnv)
            });
        case ACTION_DELETE:
            return undefined;
        default:
            throw new Error();
    }
}

function newProblem(newProblem) {
    return new Problem(newProblem);
}

function updateLanguageEnv(languageEnvs, languageEnv) {
    const languageEnvIndex = languageEnvs.findIndex(_languageEnv => _languageEnv.name === languageEnv.name);
    languageEnvs[languageEnvIndex] = languageEnv;
    return languageEnvs;
}
