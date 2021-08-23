


const TagWithIconList = ({icon, items, style}) => {
    return <>
        <div>
        {items.map(item =>
            <div style={{
                display: "flex", flexDirection: "row", alignItems: "center",
                height: "1.5em"}}>
                {icon}<span style={{marginLeft: "5px", ...style}}>{item}</span>
            </div>
        )}
        </div>
    </>;
};


export default TagWithIconList;