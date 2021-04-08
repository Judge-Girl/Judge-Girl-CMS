import './ExamineeListPage.scss';
import React, {useState} from "react";
import {TitleLine} from "../commons/titles/TitleLine";

const DropDownBtn = function ({onAddStudentBtnClick, onAddGroupBtnClick}) {
    const [active, setActive] = useState(true);

    return (
        <div>
            <div className={"dropdown" + (active ? "" : " is-active")}>
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
                            onClick={() => setActive(open => !open)}
                            onBlur={() => setActive(open => !open)}>
                        <span>+ People</span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                        <p className="dropdown-item" onMouseDown={onAddStudentBtnClick}>Student</p>
                        <p className="dropdown-item" onMouseDown={onAddGroupBtnClick}>Group</p>
                    </div>
                </div>
            </div>
        </div>

    );
};

const FilterSearchBar = ({filterItems, onAddStudentBtnClick, onAddGroupBtnClick}) => {
    return (
        <div className="is-flex is-justify-content-center">
            <div>
                <div className="select" id="filter">
                    <select>
                        {
                            filterItems?.map(name => <option key={name}>{name}</option>)
                        }
                    </select>
                </div>
            </div>
            <input style={{flexGrow: "1"}} type="text" id="searchBar"/>
            <DropDownBtn onAddStudentBtnClick={onAddStudentBtnClick}
                         onAddGroupBtnClick={onAddGroupBtnClick}/>
        </div>
    )
};


/**
 * @param title the title (str) of the page
 * @param filterItems the item's name (str) that is included in the filter drop-down list
 * @param onCreateButtonClick the event listener triggered when the green 'Create' button get clicked
 * @param tableHeaders a list of header names (str) in the table
 * @param tableRowGenerator 3 fields (1) list: 'the data list' (2) data: a data generation function that
 *  receives an index of the data and then return the content (html) of that within the <td></td>
 *  (3) key: a function that determines the key of the item given a student
 * @param tableDataStyle the custom style of the <td> elements
 */
const ExamineeListPage = ({
                          title, filterItems, onAddStudentBtnClick, onAddGroupBtnClick,
                          tableHeaders, tableRowGenerator,
                          tableDataStyle
                      }) => {
    return (
        <div className="has-text-centered">
            <TitleLine title={title}/>
            <FilterSearchBar filterItems={filterItems}
                             onAddStudentBtnClick={onAddStudentBtnClick}
                             onAddGroupBtnClick={onAddGroupBtnClick}/>
            <table className="table items-table mt-4">
                <thead>
                <tr>
                    {
                        tableHeaders?.map(header => <th key={header} scope="col">{header}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {
                    tableRowGenerator?.list
                        ?.map(item =>
                            <tr key={tableRowGenerator.key(item)}>
                                {tableRowGenerator.data(item)
                                    .map(tdContent => <td style={tableDataStyle}>{tdContent}</td>)}
                            </tr>
                        )
                }
                </tbody>
            </table>
        </div>
    )
};

export {ExamineeListPage, DropDownBtn};
