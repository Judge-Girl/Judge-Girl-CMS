import {withRouter} from "react-router";

const Login = withRouter(({history}) =>  {
    const onSubmit = (e) => {
        e.preventDefault();  // don't submit the form

        const account = e.target[0].value;
        const password = e.target[1].value;

        // TODO: Login procedure

        history.push('/dashboard');
        console.log(`Account: ${account}, Password: ${"*".repeat(password.length)}`);
    };
    return (
        <div className="App">
            <section className="container">
                <div className="columns">
                    <div className="column is-4-widescreen is-offset-4 has-text-centered">
                        <section className="cms-header">
                            <h1 id="title" className="title p-4">Judge Girl <span>CMS</span></h1>
                            <section className="register">
                                <p className="login">Login</p>
                                <form onSubmit={onSubmit} className="pb-4">
                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-medium " type="text" placeholder="Account"/>
                                        </div>
                                    </div>

                                    <div className="field">
                                        <div className="control">
                                            <input className="input is-medium" type="text" placeholder="Password"/>
                                        </div>
                                    </div>
                                    <button type="submit" className="button-submit is-block">Submit</button>
                                </form>
                            </section>
                        </section>
                    </div>
                </div>
            </section>

        </div>
    );
});


export {Login};