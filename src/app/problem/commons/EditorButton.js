import DotLoader from 'react-spinners/DotLoader';

/* TODO: Should be refactored for cleanness. */
const EditorButton = ({
	loading = false,
	text, disable = false,
	fontSize, fontColor,
	height = 46, width = 'fit-content',
	buttonColor, borderColor,
	marginTop = 0, marginRight = 0, marginBottom = 0, marginLeft = 0,
	borderRadius = 10,
	type, onClick, noBorder
}) => {
	const style = {
		background: buttonColor, color: fontColor,
		font: 'Poppins', fontSize, fontWeight: 600,
		border: noBorder? 'none': undefined,
		borderRadius, borderWidth: 1, borderColor,
		outline: 'none', boxShadow: 'none',
		padding: 10,
		display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
		height, width,
		marginTop, marginRight,
		marginBottom, marginLeft,
	};
	if (type === 'file') {
		return <>
			<label style={{cursor: 'pointer', ...style}}>
				<input type={type}
					className="original-upload-button"
					style={{cursor: 'pointer', display: 'none'}}
					onChange={onClick}/>
				{text}
			</label>
		</>;
	} else {
		return <>
			<button className="button" type={type} onClick={onClick} style={style} disabled={disable}>
				<span>{text}</span>
				<DotLoader color={'white'} loading={loading} css={{marginLeft: '10px'}} size={10} />
			</button>
		</>;
	}
};

export {EditorButton};
