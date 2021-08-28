import {useEditorContext} from "./NewMarkdownEditorContext";

const defaultLines = [
    `Press Edit Description to start writing the description. :smile:`,
    `Styling with Markdown is supported. :+1:`
];

const NewMarkdownEditorWriteTab = ({rawText = defaultLines.join("  \n")}) => {
    const {setDraftRawText} = useEditorContext();

    const handleTextareaChange = e => {
        setDraftRawText(e.target.value);
    };

    return <>
        <textarea className="main"
                  value={rawText}
                  style={{width: "100%", height: "300px"}}
                  onChange={handleTextareaChange}/>
    </>;
};

export default NewMarkdownEditorWriteTab;