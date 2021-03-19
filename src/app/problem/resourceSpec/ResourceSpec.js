import React from 'react';
import '../ProblemEditor.css';

function ResourceSpec () {
    return (
        <div>
            <h2>Resource Spec</h2>
            <hr />
            <li>
                <span>CPU</span>
                <input type="text" className="resource-spec-input-box" /></li>
            <li>
                <span>GPU</span>
                <input type="text" className="resource-spec-input-box" /></li>
        </div>

    )
}

export default ResourceSpec;