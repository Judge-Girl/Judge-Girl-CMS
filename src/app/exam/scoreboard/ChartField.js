import React from 'react';


const ChartField = ({
  title, width, charts
}) => {
  return <div style={{height: 'fit-content', marginBottom: '30px'}}>
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      {title}
    </div>
    <div style={{width: `${width}px`,
      display: 'flex', flexDirection: 'row', justifyContent: 'space-around',
      border: '1.5px solid rgba(0,0,0,.1)', borderRadius: '10px'}}>
      {charts.map((chart, index) =>
        <div key={index} style={{width: `${width/2-25}px`, paddingTop: '2.5%'}}>
          {chart}
        </div>
      )}
    </div>
  </div>;
};

export default ChartField;
