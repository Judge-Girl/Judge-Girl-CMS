import ReactMarkdown from "react-markdown";
import {useEditorContext} from "./NewMarkdownEditorContext";

/* TODO: this will be refactored in the next PR. */
const NewMarkdownEditorPreviewTab = () => {
    const {draftRawText} = useEditorContext();

    return <>
        <ReactMarkdown className="main">
            {draftRawText? draftRawText : "Empty."}
        </ReactMarkdown>
    </>;
};

export default NewMarkdownEditorPreviewTab;