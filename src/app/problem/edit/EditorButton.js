import * as React from "react";

const EditorButton = ({
                          text, buttonColor, width = 356,
                          height = 46, borderRadius = 10, fontColor,
                          onClickFunc, borderColor = buttonColor, margin,
                          marginTop, marginRight, marginBottom, marginLeft
                      }) => {
    return (
        <div>
            <button
                className="button"
                onClick={onClickFunc}
                style={{
                    background: buttonColor, width: width, height: height,
                    borderRadius: borderRadius, padding: 10, color: fontColor,
                    display: "flex", fontFamily: "Poppins", borderColor: borderColor,
                    borderWidth: 2, marginTop: marginTop,  marginRight: marginRight,
                    marginBottom : marginBottom, marginLeft: marginLeft,
                }}
            >
                {text}
            </button>
        </div>
    );
};

export {EditorButton};
