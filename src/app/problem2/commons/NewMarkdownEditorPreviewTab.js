import ReactMarkdown from "react-markdown";
import {useEditorContext} from "./NewMarkdownEditorContext";

const NewMarkdownEditorPreviewTab = () => {
    const {draftRawText} = useEditorContext();

    return <>
        <ReactMarkdown className="main">
            {draftRawText? draftRawText : "Empty."}
        </ReactMarkdown>
    </>;
};

export default NewMarkdownEditorPreviewTab;