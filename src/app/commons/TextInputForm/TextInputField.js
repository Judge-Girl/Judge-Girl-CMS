import React from 'react';
import {useRef, useState} from 'react';
import './TextInputForm.css';


const TextInputField = ({placeholder, onSubmit, buttonTitle = '+', style}) => {
	const [text, setText] = useState('');
	const inputRef = useRef();

	const onFormSubmit = e => {
		e.preventDefault();
		onSubmit(text);
		setText('');
		inputRef.current.focus();
	};

	const onChangeInput = e => setText(e.target.value);

	return (
		<div className="text-input-form">
			<form className="tag-form"
				onSubmit={onFormSubmit} style={{display: 'flex', alignItems: 'center'}}>
				<p style={{display: 'table-cell', ...style}}>
					<input type='text' name="text" className="tag-input control"
						ref={inputRef}
						placeholder={placeholder}
						value={text} onChange={onChangeInput}
						style={{width: '100%'}}/>
				</p>
				<button className="control text-item-remove-button"
					style={{cursor: 'pointer'}}>
					{buttonTitle}
				</button>
			</form>
		</div>
	);
};

export {TextInputField};
