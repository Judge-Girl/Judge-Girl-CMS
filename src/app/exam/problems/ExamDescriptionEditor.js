import MarkdownEditor from "../../commons/MarkdownEditor";


const ExamDescriptionEditor = ({problemId}) => {
    return <>
        <MarkdownEditor problemId={problemId}/>
    </>
}

export default ExamDescriptionEditor