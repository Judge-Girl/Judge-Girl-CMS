import {useEditorContext} from "./NewMarkdownEditorContext";


const defaultLines = [
    `Press Edit Description to start writing the description. :smile:`,
    `Styling with Markdown is supported. :+1:`
];

const NewMarkdownEditorWriteTab = () => {
    const {markdownText, setMarkdownText} = useEditorContext();

    const handleTextareaChange = e => {
        setMarkdownText(e.target.value);
    };

    return <>
        <textarea className="main"
                  value={markdownText}
                  placeholder={defaultLines.join("  \n")}
                  style={{width: "100%", height: "300px"}}
                  onChange={handleTextareaChange}/>
    </>;
};

export default NewMarkdownEditorWriteTab;