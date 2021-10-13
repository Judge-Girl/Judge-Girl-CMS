import './ItemListPage.scss';
import * as React from 'react';
import {TitleLine} from '../titles/TitleLine';


const FilterSearchBar = ({filterItems, Button}) => {
  return (
    <div className="is-flex is-justify-content-center">
      <div className="select" id="filter">
        <select>
          {filterItems?.map(name => <option key={name}>{name}</option>)}
        </select>
      </div>
      <input style={{flexGrow: '1'}} type="text" id="searchBar"/>
      <Button/>
    </div>
  );
};

/**
 * This callback is displayed as a item dragging function or a item dropping function.
 * @callback callback
 */

/**
 * @callback callback
 * @param {string} title the title (str) of the page
 * @param {string[]} filterItems the item's name (str) that is included in the filter drop-down list
 * @param {component} Button the green 'Create' button
 * @param {string[]} tableHeaders a list of header names (str) in the table
 * @param {{list: {obj}[], key: {obj}, data: {component}[]}[]} tableRowGenerator 3 fields (1) list: 'the data list' (2) data: a data generation function that
 *  receives an index of the data and then return the content (html) of that within the <td></td>
 *  (3) key: a function that determines the key of the item given a student
 * @param {{obj}} tableDataStyle the custom style of the <td> elements
 * @param {string} width the custom table's width
 * @param {boolean} showFilterSearchBar the decision (boolean) of showing default <FilterSearchBar> component
 * @param {boolean} draggable enable item list draggable or not
 * @param {callback} ondrag the callback function when drag the item
 * @param {callback} ondrop the callback function when drop the item
 */
const ItemListPage = ({
  title, filterItems, Button,
  tableHeaders, tableRowGenerator,
  tableDataStyle, width,
  showFilterSearchBar = true,
  draggable = false, ondrag, ondrop,
}) => {
  return (
    <div style={{width: width}}>
      {
        title ? <TitleLine title={title}/> : ''
      }
      {
        showFilterSearchBar ? (<FilterSearchBar filterItems={filterItems} Button={Button}/>) : ''
      }
      <table className="table items-table mt-4">
        <thead style={{whiteSpace: 'nowrap'}}>
          <tr>
            {
              tableHeaders?.map((header, index) =>
                <th key={index}
                  scope="col"
                  style={{verticalAlign: 'middle'}}>{header}</th>)
            }
          </tr>
        </thead>
        <tbody>
          {
            tableRowGenerator?.list
              ?.map(item =>
                <tr key={tableRowGenerator.key(item)}
                  draggable={draggable}
                  onDragStart={draggable ? (e) => ondrag(e, item) : undefined}
                  onDragOver={draggable ? (e) => e.preventDefault() : undefined}
                  onDrop={draggable ? (e) => ondrop(e, item) : undefined}>
                  {tableRowGenerator.data(item).map((tdContent, index) =>
                    <td key={index}
                      style={{verticalAlign: 'middle', ...tableDataStyle}}>
                      {tdContent}
                    </td>)}
                </tr>
              )
          }
        </tbody>
      </table>
    </div>
  );
};

export {ItemListPage, FilterSearchBar};
