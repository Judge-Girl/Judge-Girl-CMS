import './InlineInputBox.css';

const InputBox = ({type = "text", className = "input-box", value, onChange}) => {
    return (
        <input type={type} className={className} value={value} onChange={onChange}/>
    );
};

const InlineInputBox = ({title = "title", fontSize = "fontSize", value, onChange}) => {
    return (
        <li className="inline-input-box">
            <span style={{fontSize: fontSize}}>{title}</span>
            <InputBox type="text" className="input-box" value={value} onChange={onChange}/>
        </li>
    )
};

export {InputBox, InlineInputBox};