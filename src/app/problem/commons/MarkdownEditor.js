import {useState} from "react";


const MarkdownEditor = ({tabObjects, defaultIndex, isEditing}) => {
    const LEFTMOST_TAB_INDEX = 0;
    const [currentTabNo, setCurrentTabNo] = useState(LEFTMOST_TAB_INDEX);

    return <>
        <div className="markdown">
            {isEditing?
                <div className="tabs">
                {tabObjects.map((tabObject, i) =>
                    <button className={["tab", i === currentTabNo? "current": ""].join(" ")}
                            style={i !== LEFTMOST_TAB_INDEX? {marginLeft: "-1px"}: {}}
                            onClick={() => setCurrentTabNo(i)}>
                        {tabObject.title}
                    </button>
                )}
                    <div className="placeholder" style={{flex: 1}}/>
                </div>
                : ""
            }
            {tabObjects[isEditing? currentTabNo: defaultIndex].component}
        </div>
    </>;
}

export default MarkdownEditor;