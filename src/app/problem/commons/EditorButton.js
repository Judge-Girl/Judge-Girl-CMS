
/* TODO: Should be refactored for cleanness. */
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
        font: "Poppins", fontSize, fontWeight: 600,
        border: noBorder? "none": undefined,
        borderRadius, borderWidth: 2, borderColor,
        outline: "none", boxShadow: "none",
        padding: 10,
        display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center",
        height, width,
        marginTop, marginRight,
        marginBottom, marginLeft,
    };
    if (type === "file") {
        return <>
            <label style={{cursor: "pointer", ...style}}>
                <input type="file"
                       className="original-upload-button"
                       style={{cursor: "pointer", display: "none"}}
                       onChange={onClick}/>
                {text}
            </label>
        </>;
    } else {
        return <>
            <button className="button" type={type} onClick={onClick} style={style}>
                {text}
            </button>
        </>;
    }
};

export {EditorButton};
