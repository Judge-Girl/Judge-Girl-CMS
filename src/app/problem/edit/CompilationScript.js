import React, {useState} from 'react';
import './CompilationScript.css';

function CompilationScript({problemAttributes}) {
    console.log(problemAttributes.languageEnvs)
    const [script, setScript] = useState(problemAttributes.languageEnvs[0].compilation.script)
    return (
        <div>
            <div className={`mt-2 has-text-left`} style={{width: "100%"}}>
                <div className={"is-flex is-align-items-center is-justify-content-space-between"}>
                    <p className="title-line" style={{fontSize: '17px', color: '#6D6E7D', shadow: "false", fontWeight: 'bold'}}>
                        {"Compilation Script"}
                    </p>
                    <button className="button compile-script-button">Auto Generate</button>
                </div>
                <hr className={`my-1`} style={{backgroundColor: '#A2A3B1', height: 1}}/>
            </div>
            <textarea value={script}
                      onChange={(e) => setScript(e.target.value)}
                      className="compile-script-text-area" cols="40" rows="5"
                      style={{resize: "vertical"}}
            />
        </div>
    )
}

export default CompilationScript;
