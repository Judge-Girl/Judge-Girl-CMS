import {createContext, useContext} from "react";

export const EditorContext = createContext(undefined);

export const useEditorContext = () => {
    return useContext(EditorContext);
};
