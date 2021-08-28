import ReactMarkdown from "react-markdown";
import {useEditorContext} from "./NewMarkdownEditorContext";

const forTesting = [
    `## Testing Header`,
    ``,
    `### Testing List`,
    ``,
    `1. hi`,
    `2. \`hello\``,
    `3. *great*`,
    "4. __nice__",
    ``,
    "```js",
    `const nicer = () => {`,
    `  return "123";`,
    `}`,
    "```",
    `---------------`,
    ``,
    `[Google](https://google.com.tw)`,
]


const NewMarkdownEditorPreviewTab = () => {
    const {markdownText} = useEditorContext();

    return <>
        <p>
            <ReactMarkdown className="main">
                {markdownText? markdownText : forTesting.join("\r\n")}
            </ReactMarkdown>
        </p>
    </>;
};

export default NewMarkdownEditorPreviewTab;