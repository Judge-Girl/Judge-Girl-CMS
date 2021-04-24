import React from 'react'

const Tag = ({ tag, onDelete }) => {
  return (
    <div>
      <h3>
        { tag.text }
        <button onClick={ () => { onDelete(tag.id) } }>X</button>
      </h3>
    </div>
  )
}



export default Tag