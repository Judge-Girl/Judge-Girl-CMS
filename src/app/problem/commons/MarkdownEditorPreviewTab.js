import {useEditorContext} from "./MarkdownEditorContext";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import ReactMarkdown from "react-markdown";

const stub = [
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

const mathJaxConfig = {
    loader: { load: ["[tex]/html"] },
    tex: {
        packages: { "[+]": ["html"] },
        inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"]
        ],
        displayMath: [
            ["$$", "$$"],
            ["\\[", "\\]"]
        ]
    }
};

const MarkdownEditorPreviewTab = () => {
    const {markdownText} = useEditorContext();

    return <>
        <MathJaxContext version={3} config={mathJaxConfig}>
            <MathJax hideUntilTypeset={"first"} inline dynamic>
                <ReactMarkdown>
                    {markdownText? markdownText.replace(/\\/g, `\\\\`): stub.join("\r\n")}
                </ReactMarkdown>
            </MathJax>
        </MathJaxContext>
    </>;
};

export default MarkdownEditorPreviewTab;