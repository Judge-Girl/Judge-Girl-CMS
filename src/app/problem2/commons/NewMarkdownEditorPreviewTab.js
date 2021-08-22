import ReactMarkdown from "react-markdown";
import {useEditorContext} from "./NewMarkdownEditorContext";

const NewMarkdownEditorPreviewTab = () => {
    const {draftRawText} = useEditorContext();

    return <>
        <ReactMarkdown className="main">
            {draftRawText? draftRawText : "1233333333333333333333333"}
        </ReactMarkdown>
    </>;
};

export default NewMarkdownEditorPreviewTab;