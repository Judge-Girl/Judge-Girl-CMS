import {useState} from "react";


const MarkdownEditor = ({tabObjects, defaultIndex, isEditing}) => {
    const LEFTMOST_TAB_INDEX = 0;
    const [currentTabIndex, setCurrentTabIndex] = useState(LEFTMOST_TAB_INDEX);

    return <>
        <div className="markdown">
            {isEditing?
                <div className="tabs">
                {tabObjects.map((tabObject, i) =>
                    <button className={["tab", i === currentTabIndex? "current": ""].join(" ")}
                            style={i !== LEFTMOST_TAB_INDEX? {marginLeft: "-1px"}: {}}
                            onClick={() => setCurrentTabIndex(i)}>
                        {tabObject.title}
                    </button>
                )}
                    <div className="placeholder" style={{flex: 1}}/>
                </div>
                : ""
            }
            {tabObjects[isEditing? currentTabIndex: defaultIndex].component}
        </div>
    </>;
}

export default MarkdownEditor;