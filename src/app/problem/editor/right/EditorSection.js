import React from 'react';

/**
 * @param id, give an id to this block.
 * @param title, block title that will be shown above the block content.
 * @param titleButton, a button on the right hand side of the @param title.
 * @param buttonPos, the position of titleButton. Can be "top" or "down".
 * @param children, the nested component.
 * @param style, the style properties for css customization.
 */
const EditorSection = ({id, title, titleButton, buttonPos='top', children, style}) => {
  return <>
    <div id={id} style={{width: '100%', ...style}}>
      <div className="block-title" style={{
        display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start',
        marginTop: '-3.5em', flexWrap: 'wrap', minWidth: '300px'
      }}>
        <div className="block-title-item" style={{fontSize: '21px', fontWeight: '700', alignSelf: 'center'}}>
          {title}
        </div>
        {buttonPos === 'top'?
          <div className="block-title-item">
            {titleButton}
          </div> : ''
        }
      </div>
      <div className="block-content">
        {children}
      </div>
      {buttonPos === 'down'?
        <div className="block-title-item down">
          {titleButton}
        </div> : ''
      }
    </div>
  </>;
};

export default EditorSection;
