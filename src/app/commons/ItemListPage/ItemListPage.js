import './ItemListPage.scss';
import * as React from "react";
import {TitleLine} from "../titles/TitleLine";


const FilterSearchBar = ({filterItems, Button}) => {
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
            <Button/>
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
const ItemListPage = ({
                          title, filterItems, Button,
                          tableHeaders, tableRowGenerator,
                          tableDataStyle, 
                          showFilterSearchBar = true,
                      }) => {
    return (
        <div className="has-text-centered">
            <TitleLine title={title}/>
            {showFilterSearchBar ? (<FilterSearchBar filterItems={filterItems} Button={Button} />) : ''}
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

export {ItemListPage, FilterSearchBar};
