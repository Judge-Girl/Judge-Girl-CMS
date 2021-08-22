const Block = ({title, id, titleButton, children, style}) => {

    return <>
        <div id={id} style={{width: "100%", ...style}}>
            <div className="block-title" style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <div className="block-title-item" style={{fontSize: "21px", fontWeight: "700"}}>
                    {title}
                </div>
                <div className="block-title-item">
                    {titleButton}
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </>;
};

export default Block;