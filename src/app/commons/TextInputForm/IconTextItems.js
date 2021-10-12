import React from 'react';
import './IconTextItems.scss';

const IconTextItems = ({icon, items, placeholder = 'Empty.', style}) => {
	return <>
		<div className="icon-text-items">
			{items.length === 0 ?
				<span className="placeholder">{placeholder}</span> : ''
			}
			{items.map((item, i) =>
				<div key={i} className="item">
					{icon}
					<span style={style}>{item}</span>
				</div>)
			}
		</div>
	</>;
};

export default IconTextItems;
