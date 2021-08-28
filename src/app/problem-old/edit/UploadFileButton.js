import './UploadFileButton.css';


const UploadFileButton = ({
    title = "title", onChange = "onChange",
    width, height, buttonColor = "buttonColor",
    borderRadius, fontWeight,
    fontSize, lineHeight,
    fontColor = "white", className
}) => {
    return (
        <label
            style={{
                width, height, buttonColor, borderRadius,
                fontWeight, fontSize, lineHeight, color: fontColor,
                display: "flex", flexDirection: "row", justifyContent: "center",
                alignItems: "center", padding: "5 10", fontFamily: "Poppins"
            }}
            className={className}
        >
            <span>{title}</span>
            <input
                type="file"
                name="file"
                onChange={onChange}
                className="original-upload-button"
            />
        </label>
    );
};


export {UploadFileButton};
