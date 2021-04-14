import './InlineInputBox.css';

const InputBox = ({type = "text", className = "input-box"}) => {
    return (
        <input type={type} className={className}/>
    );
};

const InlineInputBox = ({title = "title", fontSize = "fontSize"}) => {
    return (
        <li>
            <span style={{fontSize: fontSize}}>{title}</span>
            <InputBox type="text" className="input-box"/>
        </li>
    )
};

export {InputBox, InlineInputBox};