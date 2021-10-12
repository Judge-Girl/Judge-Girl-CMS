import {SubtitleLine} from '../../commons/titles/TitleLine';
import {useTextItems} from '../../usecases/TextItemUseCase';
import {TextInputField} from '../../commons/TextInputForm/TextInputField';
import {FixedTextInputField} from '../../commons/TextInputForm/FixedTextInputField';
import './ExamOptions.scss';

const ExamWhiteList = () => {
	const {textItems, addTextItem, removeTextItem} = useTextItems();
	return (
		<div>
			<SubtitleLine title={'WhiteList'}/>
			<TextInputField placeholder={'Add IP'} onSubmit={addTextItem}/>
			<FixedTextInputField items={textItems} removeItem={removeTextItem}/>
		</div>
	);
};

export default ExamWhiteList;
