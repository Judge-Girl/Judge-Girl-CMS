const Block = ({title, id, titleButton, children}) => {

    return <>
        <div id={id} style={{width: "100%"}}>
            <div style={{
                display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                <div style={{fontSize: "21px", fontWeight: "700"}}>
                    {title}
                </div>
                <div>{titleButton}</div>
            </div>
            <div>
                {children}
            </div>
        </div>
    </>;
}

export default Block;