import React, {useState} from 'react';
import '../ProblemEditor.module.css';

function TagsFrom(props) {
    const [input, setInput] = useState('');
    const [tagId, setTagId] = useState(0);

    const handleChange = e => {
        setInput(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();

        props.onSubmit({
           id: tagId, text: input
        });

        setInput('');
        setTagId(tagId + 1);
    };

    return (
        <form className="tag-form" onSubmit={handleSubmit}>
            <div className="field has-addons">
                <input
                    type='text'
                    placeholder="Add New Tags"
                    value={input}
                    name="text"
                    className="tag-input control"
                    onChange={handleChange}
                />
                <button className="control tag-button">
                    +
                </button>
            </div>
        </form>
    );
}

export default TagsFrom;
