import * as React from "react";

const EditorButton = ({
                          text, buttonColor, width=356,
                          height=46, borderRadius=10, fontColor
                      }) => {
    return (
        <div>
            <button
                className="button"
                style={{
                    background: buttonColor, width: width, height: height,
                    borderRadius: 10, marginBottom: 10, padding: 10, color: fontColor,
                    display: "flex", fontFamily: "Poppins",
                }}
            >
                {text}
            </button>
        </div>
    );
};

export {EditorButton};
