import {useState} from "react";


const MarkdownEditor = ({className, tags, defaultTabIndex, isEditing}) => {
    const LEFTMOST_TAB_INDEX = 0;
    const [currentTabIndex, setCurrentTabIndex] = useState(LEFTMOST_TAB_INDEX);

    return <>
        <div className={className}>
            <div className="tabs">
            {isEditing?
                [tags.map((tag, i) =>
                    <button className={["tab", i === currentTabIndex? "current": ""].join(" ")}
                            style={i !== LEFTMOST_TAB_INDEX? {marginLeft: "-1px"}: {}}
                            onClick={() => setCurrentTabIndex(i)}>
                        {tag.title}
                    </button>),
                    /* TODO: Is it possible to replace this by css? */
                    <div className="placeholder" style={{flex: 1}}/>
                ]
                : ""
            }
            </div>
            <div className="main">
                {tags[isEditing? currentTabIndex: defaultTabIndex].component}
            </div>
        </div>
    </>;
};

export default MarkdownEditor;
