import {useEditorContext} from "./NewMarkdownEditorContext";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import ReactMarkdown from "react-markdown";

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

const config = {
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

const NewMarkdownEditorPreviewTab = () => {
    const {markdownText} = useEditorContext();

    console.log("0828 markdownText:", markdownText);

    return <>
        <MathJaxContext version={3} config={config}>
            <MathJax hideUntilTypeset={"first"}
                     inline
                     dynamic>
                <ReactMarkdown className="main">
                    {markdownText?
                        markdownText.replace(/\\/g, `\\\\`): forTesting.join("\r\n")}
                </ReactMarkdown>
            </MathJax>
        </MathJaxContext>
    </>;
};

export default NewMarkdownEditorPreviewTab;