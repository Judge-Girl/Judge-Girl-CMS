import {useState} from "react";


const NewMarkdownEditor = ({tabObjects, defaultIndex, onEdit}) => {
    const [currentTabNo, setCurrentTabNo] = useState(0);

    return <>
        <div className="markdown">
            {onEdit?
                <div className="tabs">
                {tabObjects.map((tabObject, i) =>
                    <button className={["tab", i === currentTabNo? "current": ""].join(" ")}
                            style={i !== 0? {marginLeft: "-1px"}: {}}
                            onClick={() => setCurrentTabNo(i)}>
                        {tabObject.title}
                    </button>
                )}
                    <div className="placeholder" style={{flex: 1}}/>
                </div>
                : ""
            }
            {tabObjects[onEdit? currentTabNo: defaultIndex].component}
        </div>
    </>;
}

export default NewMarkdownEditor;