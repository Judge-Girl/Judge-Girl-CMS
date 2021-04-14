import * as React from "react";

const EditorButton = ({
                          text, buttonColor, width = 356,
                          height = 46, borderRadius = 10, fontColor,
                          onClickFunc, borderColor = buttonColor, margin
                      }) => {
    return (
        <div>
            <button
                className="button"
                onClick={onClickFunc}
                style={{
                    background: buttonColor, width: width, height: height,
                    borderRadius: borderRadius, marginBottom: 10, padding: 10, color: fontColor,
                    display: "flex", fontFamily: "Poppins", borderColor: borderColor, margin: margin,
                }}
            >
                {text}
            </button>
        </div>
    );
};

export {EditorButton};
