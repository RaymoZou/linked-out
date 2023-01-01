import React from "react";

export default function SignIn(props) {
    return (
        <>
            <div>Sign in</div>
            <button onClick={props.signInMethod}>Sign in With Google</button>
        </>
    )
}