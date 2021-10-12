import './DangerZone.scss';
import React from 'react';

const DangerZone = function ({onDangerButtonClick, header, description, buttonName}) {
  return (
    <div className="danger-zone">
      <section>
        <div className="danger-box">
          <div className="columns">
            <div className="column">
              <p className="danger-zone-title">{header}</p>
              <p className="description">{description}</p>
            </div>
            <div className="column is-narrow mt-1 mr-5">
              <button className="button" onClick={onDangerButtonClick}>
                {buttonName}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

};

export {DangerZone};
