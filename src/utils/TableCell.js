import React from 'react';

export const TableCell = ({className, style, children}) => {
	return <div className={className} style={{display: 'flex', justifyContent: 'left', ...style}}>{children}</div>;
};

export const EmptyCell = () => {
	return <TableCell/>;
};
