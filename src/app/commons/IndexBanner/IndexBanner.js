import './IndexBanner.scss'
import {NavLink} from "react-router-dom";
import FakeLink from "../FakeLink";

function link(currentPathName, to, name, Icon) {
    return (
        <NavLink to={to} activeClassName="is-active">
            <Icon className="tab-icon"/>{name}</NavLink>
    );
}

const IndexBanner = function ({currentPathName, path, tabContents}) {
    return (
        <div className="index-container">
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

export {IndexBanner};