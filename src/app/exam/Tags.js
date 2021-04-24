import Tag from './Tag'


const Tags = ({ tags, onDelete }) => {
  return (
    <>{
      tags.map((tag) =>
        (<Tag
          key={ tag.id }
          tag={ tag }
          onDelete={ onDelete }/>))
    }</>
  )
}


export default Tags