import NotFoundPage from "../commons/notFoundPage/NotFoundPage";
import React, {useState} from "react";
import {Redirect} from "react-router-dom";


const ProblemNotFound = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false)

    if (shouldRedirect) {
        console.log("redirect")
        return (<Redirect to={`/problems`}/>);
    }

    return (
        <>
            <NotFoundPage
                errorMsg={['We can not find this problem !', 'If you find this wrong, please contact the admin.']}
                onGoBackClick={() => setShouldRedirect(true)}/>
        </>
    )
}

export default ProblemNotFound
