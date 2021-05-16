import React from "react";

export const TableCell = ({style, children}) => {
    return <div style={{ display: "flex", justifyContent: "left", ...style }}>{children}</div>
}

export const EmptyCell = () => {
    return <TableCell/>
}