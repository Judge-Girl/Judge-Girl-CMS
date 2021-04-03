import React from "react";
import {Route, Redirect} from "react-router-dom";
import {useAuth} from "./auth";

function PrivateRoute({component: Component, ...rest}) {
    const {admin} = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                admin ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{pathname: '/', state: {referer: props.location}}}/>
                )
            }
        />
    );
}

export default PrivateRoute;
