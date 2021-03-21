import React from 'react';
import '../ProblemEditor.css';

function CompilationScript() {
    return (
        <div>
            <h2>Compilation Script</h2>
            <button className="button compile-script-button">Auto Generate</button>
            <hr />
            <textarea className="compile-script-text-area" cols="40" rows="5" />

        </div>
    )
}

export default CompilationScript;
