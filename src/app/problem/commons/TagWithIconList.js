

const TagWithIconList = ({
    icon, items,
    placeholder="Empty.",
    style,
}) => {
    return <>
        <div className="tag-with-icon-list">
        {items.length === 0?
            <span className="placeholder">{placeholder}</span>: ""
        }
        {items.map((item, i) =>
            <div key={i} className="item">
                <div>{icon}</div>
                <span style={style}>{item}</span>
            </div>)
        }
        </div>
    </>;
};


export default TagWithIconList;