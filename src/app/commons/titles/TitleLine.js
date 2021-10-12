import './TitleLine.css';
import * as React from 'react';

const TestCaseSubtitleLine = function ({title, fontSize = 15}) {
	return TitleLine({
		title, fontSize,
		color: '#6D6E7D', shadow: false, lineColor: '#A2A3B1', hrMarginY: 1, hrHeight: 1
	});
};

const SubtitleLine = function ({title}) {
	return TitleLine({
		title, fontSize: '17px',
		color: '#6D6E7D', shadow: false, lineColor: '#A2A3B1', hrMarginY: 1, hrHeight: 1
	});
};

const TitleLine = function ({
	title, fontSize = '35px', alignment = 'left',
	width = '100%',
	color = '#374550', shadow = true, fontWeight = 'bold',
	lineColor = '#E4E1E1', hrHeight = 2, hrMarginY = 4
}) {
	const textShadow = shadow ? '2px 2px 0 rgba(0, 0, 0, 0.25)' : '0';
	return (
		<div className={`mt-2 has-text-${alignment}`} style={{width}}>
			<p className="title-line" style={{fontSize, color, textShadow, fontWeight}}>
				{title}
			</p>
			<hr className={`my-${hrMarginY}`} style={{backgroundColor: lineColor, height: hrHeight}}/>
		</div>
	);
};

export {TitleLine, SubtitleLine, TestCaseSubtitleLine};
