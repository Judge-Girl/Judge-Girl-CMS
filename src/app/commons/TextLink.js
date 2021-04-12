import * as React from "react";

export default function TextLink({content, onClick}) {
    return (
        <span style={{color: "#1273BA", cursor: "pointer"}}
              onClick={onClick}> {content} </span>
    )
}
