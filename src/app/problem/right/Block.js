

const Block = ({id, title, titleButton, children, style}) => {
    return <>
        <div id={id} style={{width: "100%", ...style}}>
            <div className="block-title" style={{
                display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start",
                marginTop: "-3.5em"
            }}>
                <div className="block-title-item" style={{fontSize: "21px", fontWeight: "700", alignSelf: "center"}}>
                    {title}
                </div>
                <div className="block-title-item">
                    {titleButton}
                </div>
            </div>
            <div className="block-content">
                {children}
            </div>
        </div>
    </>;
};

export default Block;