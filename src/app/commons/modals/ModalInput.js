import React from 'react';
import './ModalInput.css';

// eslint-disable-next-line react/display-name
export const ModalInput = React.forwardRef((
	{
		type = 'text', value,
		placeholder, placeholderTextAlign,
		height, fontSize, labelText, labelFontSize,
		onChange = () => {},
		required = true
	}, ref) => {
	return (
		<div className="mt-3">
			{labelText ?
				<label className="modal-input-label" style={{fontSize: labelFontSize}}>{labelText}</label> : ''}
			<input ref={ref} className={`modal-input placeholder-align-${placeholderTextAlign}`}
				type={type} style={{height, fontSize}}
				value={value} placeholder={placeholder}
				onChange={onChange} required={required}/>
		</div>
	);
});
