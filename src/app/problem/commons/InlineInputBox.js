import './InlineInputBox.scss'

const InlineInputBox = ({title = "title", type = "text", fontSize = "fontSize", value = ""}) => {
    return (
        <li className="inline-input-box">
            <span style={{fontSize: fontSize}}>{title}</span>
            <input type={type} value={value}/>
        </li>
    )
};

export {InlineInputBox};
