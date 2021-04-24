import { useState } from 'react'

const AddTag = ({ onAdd }) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please enter tag name')
      return
    }
    onAdd({ text })
    setText('')
  }

  return (
    <>
      <form onSubmit={ onSubmit }>
        <div >
          <input type='text' placeholder='Add Tag'
                 value={ text } onChange={ (e) => setText(e.target.value) }/>
          <input className='btn btn-block' type='submit' value='Add' />
        </div>
      </form>
    </>
  )
}


export default AddTag