import MarkdownEditor from "../../commons/MarkdownEditor";


const ExamDescriptionEditor = ({problemId, style}) => {
    return <MarkdownEditor problemId={problemId} style={style}/>
}

export default ExamDescriptionEditor