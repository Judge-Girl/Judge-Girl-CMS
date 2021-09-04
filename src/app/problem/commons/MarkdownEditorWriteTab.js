import {useEditorContext} from "./MarkdownEditorContext";

const defaultLines = [
    `Press Edit Description to start writing the description. :smile:`,
    `Styling with Markdown is supported. :+1:`
];

/* TODO: this will be refactored in the next PR. */
const MarkdownEditorWriteTab = () => {
    const {markdownText, setMarkdownText} = useEditorContext();

    const handleTextareaChange = e => {
        setMarkdownText(e.target.value);
    };

    return <>
        <textarea placeholder={defaultLines.join("\r\n")}
                  value={markdownText}
                  onChange={handleTextareaChange}/>
    </>;
};

export default MarkdownEditorWriteTab;