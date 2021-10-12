import {SubtitleLine} from '../../commons/titles/TitleLine';
import {ModalInput} from '../../commons/modals/ModalInput';

const ExamName = ({examName, onChange}) => {
	return <>
		<SubtitleLine title="Name"/>
		<ModalInput value={examName}
			fontSize="20px" height="11px"
			placeholder="Enter a new name here!"
			placeholderTextAlign="left"
			onChange={onChange}/>
	</>;
};


export default ExamName;