import './InPageNavigationBar.scss'
import {Link, NavLink} from "react-router-dom";
import FakeLink from "../FakeLink";

function link(currentPathName, to, name, Icon) {
    return (
        <NavLink to={to} activeClassName="is-active" key={to}>
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

const InPageNavigationBar = function ({currentURL, path, tabContents, events}) {
    const secondSlashPos = currentURL.substr(1).indexOf('/')
    const to = currentURL.substr(0, 1+secondSlashPos)
    // TODO: firstParamResetState is not a good design and should be fixed on issue #85.
    const { firstParamResetState } = events

    return (
        <div className="in-page-nav-bar">
            <p className="path">
                <Link
                    to={to}
                    onClick={() => { firstParamResetState(null) }}>{path.head}</Link>
                <span> / </span><FakeLink inline>{path.tail}</FakeLink>
            </p>
            <div className="tabs">
                {tabContents?.map(content =>
                    link(currentURL, content.to, content.name, content.icon))}
            </div>
        </div>
    )
};

export {InPageNavigationBar};