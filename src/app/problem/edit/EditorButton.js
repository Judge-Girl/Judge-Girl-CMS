
const EditorButton = ({
                          text, buttonColor, width = 356,
                          height = 46, borderRadius = 10, fontColor,
                          onClick, borderColor = buttonColor,
                          marginTop, marginRight, marginBottom, marginLeft
                      }) => {
    return (
        <div>
            <button
                className="button"
                onClick={onClick}
                style={{
                    background: buttonColor, width: width, height: height,
                    font: "Poppins", fontSize: 17, fontWeight: 600,
                    borderRadius: borderRadius, padding: 10, color: fontColor,
                    display: "flex", borderColor: borderColor,
                    borderWidth: 2, marginTop: marginTop, marginRight: marginRight,
                    marginBottom: marginBottom, marginLeft: marginLeft,
                    outline: "none", boxShadow: "none"
                }}>
                {text}
            </button>
        </div>
    );
};

export {EditorButton};
