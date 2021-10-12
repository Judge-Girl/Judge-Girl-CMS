import React from 'react';


const Card = ({
	title,
	children,
	style
}) => {
	const {color} = style;
	return <>
		<div className="card" style={{margin: '5px'}}>
			<div className="card-content">
				<div style={{color, textAlign: 'center' }}>
					<span style={{fontSize: '20px'}}>{title}</span>
					<br/>
					{children}
				</div>
			</div>
		</div>
	</>;
};

export default Card;