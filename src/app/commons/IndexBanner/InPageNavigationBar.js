import './InPageNavigationBar.scss'
import {NavLink} from "react-router-dom";
import FakeLink from "../FakeLink";

function link(currentPathName, to, name, Icon) {
    return (
        <NavLink to={to} activeClassName="is-active">
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

/**
 * @param currentPathName
 * @param path, the path show on the navigation bar. 2 fields
 *              (1) head (str) (2) tail (str)
 *              Example on the UI: Exam / Final test
 * @param tabContents, the tabs' contents. 3 fields
 *              (1) to, the path to the next page
 *              (2) name, the name (str) of the tab
 *              (3) Icon, the Icon on the tab
 */

const InPageNavigationBar = function ({currentPathName, path, tabContents}) {
    return (
        <div className="in-page-nav-bar">
            <p className="path">
                <FakeLink content={path.head}/><span> / </span><FakeLink content={path.tail}/>
            </p>
            <div className="tabs">
                {tabContents?.map(content =>
                    link(currentPathName, content.to, content.name, content.icon))}
            </div>
        </div>
    )
};

export {InPageNavigationBar};