import logo from './logo.svg';
import './Demo.css';
import 'bulma';
import {Component} from "react/cjs/react.production.min";
import * as React from "react";

function App({title}) {
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState("");
    const nameInput = React.createRef();
    const updateNameFromInput = () => {
        setName(nameInput.current.value);
    };
    return (
        <div className="App">
            <h3>{title}</h3>
            <header className="App-header">
                <p>{`${name}: ${count}`}</p>
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <form>
                    <input id="nameInput" type="text" ref={nameInput}
                           placeholder="Name" onKeyDown={updateNameFromInput}/>
                </form>
                <button onClick={() => setCount(count + 1)}>Count</button>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
