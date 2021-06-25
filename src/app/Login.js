import {withRouter} from "react-router";
import {studentService} from "../services/services";
import {useAuth} from "./commons/access-control/auth";
import {useEffect, useState} from "react";

const Login = withRouter(({history, location}) => {
    const [hasTriedAuth, setHasTriedAuth] = useState(false);
    const {setAdmin} = useAuth();
    const referer = location?.state?.referer || '/problems';

    useEffect(() => {
        // TODO: Find a better way rather than hard-coded.
        //       Reason: Currently only login page will have backgroundDim color.
        document.body.style.backgroundColor = "var(--backgroundDim)"
        if (!hasTriedAuth) {
            setHasTriedAuth(true);

            studentService.tryAuthWithLocalToken()
                .then(admin => {
                    setAdmin(admin);
                    history.push(referer);
                }).catch(err => console.log(`Auth failed: ${err}`));
        }
        return function cleanup () { document.body.style.backgroundColor = "var(--background)" }
    }, [hasTriedAuth, history, setAdmin, referer]);

    const onSubmit = (e) => {
        e.preventDefault();  // don't submit the form

        const email = e.target[0].value;
        const password = e.target[1].value;
        console.log(`Account: ${email}, Password: ${"*".repeat(password.length)}`);

        studentService.loginAsAdmin(email, password)
            .then(admin => {
                setAdmin(admin);
                history.push(referer);
            }).catch((err) => alert(`Login failed: ${err.message}`));
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
                                            <input className="input is-medium" type="password" placeholder="Password"/>
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
