import './ThreeDotsButton.scss';
import React, {useState} from 'react';
import {BsThreeDotsVertical} from 'react-icons/bs';

/**
 * @param dropDownItems the item in the dropdown. 2 fields.
 *          (1) name: dropDownItem's name
 *          (2) onClick: the event when you click the dropDownItem
 */

const ThreeDotsButton = ({dropDownItems}) => {
  const [active, setActive] = useState(true);

  return (
    <div className={'dropdown three-dot-button' + (active ? '' : ' is-active')}>
      <div className="dropdown-trigger">
        <button className="button" aria-haspopup="true" aria-controls="dropdown-menu"
          onClick={() => setActive(active => !active)}
          onBlur={() => setActive(active => !active)}>
          <BsThreeDotsVertical/>
        </button>
      </div>
      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {
            dropDownItems?.map(item =>
              <p key={item.name}
                className={`dropdown-item ${item.dangerous ? ' is-dangerous' : ''}`}
                onMouseDown={item.onClick}>{item.name}</p>)
          }
        </div>
      </div>
    </div>
  );
};

export {ThreeDotsButton};
