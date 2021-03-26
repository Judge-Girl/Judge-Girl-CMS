import './ItemListPage.css';
import * as React from "react";
import {TitleLine} from "../TitleLine";


const FilterSearchBar = ({filterItems, onCreateButtonClick}) => {
    return (
        <div className="is-flex is-justify-content-center">
            <div>
                <div className="select" id="filter">
                    <select>
                        {
                            filterItems?.map(name => <option>{name}</option>)
                        }
                    </select>
                </div>
            </div>
            <input style={{flexGrow: "1"}} type="text" id="searchBar"/>
            <button className="button ml-2 my-green-btn" id="create-exam-btn"
                    style={{flexGrow: "1"}} onClick={onCreateButtonClick}>+Create
            </button>
        </div>
    )
};


/**
 * @param title the title (str) of the page
 * @param filterItems the item's name (str) that is included in the filter drop-down list
 * @param onCreateButtonClick
 * @param tableHeaders
 * @param tableRowGenerator
 * @param tableDataStyle
 * @returns {*}
 * @constructor
 */
const ItemListPage = ({
                          title, filterItems, onCreateButtonClick,
                          tableHeaders, tableRowGenerator,
                          tableDataStyle
                      }) => {
    return (
        <div className="has-text-centered">
            <TitleLine title={title}/>
            <FilterSearchBar filterItems={filterItems} onCreateButtonClick={onCreateButtonClick}/>
            <table className="table items-table mt-4">
                <thead>
                <tr>
                    {
                        tableHeaders?.map(header => <th scope="col">{header}</th>)
                    }
                </tr>
                </thead>
                <tbody>
                {

                    tableRowGenerator?.list
                        ?.map(item =>
                            <tr>
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

export {ItemListPage, FilterSearchBar};
