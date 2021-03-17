import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

function SubmittedCode ({tags, removeTag}) {
    return tags.map((tag, index) => (
        <div key={tag.id} className="tag-item" >
            <div key={tag.id}>
                {tag.text}
            </div>
            {/*<div className='icons' class="tag-delete-icons">*/}
            <AiOutlineClose
                onClick={() => removeTag(tag.id)}
                className='delete-icon'
            />
            {/*</div>*/}

        </div>

    ));
}

export default SubmittedCode;