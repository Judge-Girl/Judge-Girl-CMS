

const EditorButton = ({
    text,
    fontSize, fontColor,
    height = 46, width = "fit-content",
    buttonColor, borderColor,
    marginTop = 0, marginRight = 0, marginBottom = 0, marginLeft = 0,
    borderRadius = 10,
    type, onClick, noBorder
}) => {
    const style = {
        background: buttonColor, color: fontColor,
        height: height, width: width,
        font: "Poppins", fontSize, fontWeight: 600,
        border: noBorder? "none": undefined,
        borderRadius: borderRadius, borderWidth: 2, borderColor: borderColor,
        outline: "none", boxShadow: "none",
        marginTop: marginTop, marginRight: marginRight,
        marginBottom: marginBottom, marginLeft: marginLeft,
        padding: 10,
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
    }
    if (type === "file") {
        return <>
            <label style={{cursor: "pointer", ...style}}>
                <input type="file"
                       className="original-upload-button"
                       style={{cursor: "pointer"}}
                       onChange={onClick}/>
                {text}
            </label>
        </>;
    } else {
        return <>
            <button
                className="button"
                type={type}
                onClick={onClick}
                style={style}>
                {text}
            </button>
        </>;
    }
};

export {EditorButton};
