import * as React from "react";

export default function FakeLink({content}) {
    return (
        <span style={{color: "#1273BA", cursor: "pointer"}}
              onClick={e => {
              }}> {content} </span>
    )
}
