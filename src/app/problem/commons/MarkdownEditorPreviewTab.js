import ReactMarkdown from "react-markdown";
import {useEditorContext} from "./MarkdownEditorContext";

/* TODO: this will be refactored in the next PR. */
const MarkdownEditorPreviewTab = () => {
    const {draftRawText} = useEditorContext();

    return <ReactMarkdown className="main">
        {draftRawText? draftRawText : "Empty."}
    </ReactMarkdown>;
};

export default MarkdownEditorPreviewTab;