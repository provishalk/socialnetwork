import React from 'react'
import "./AuthWrapper.scss"
const AuthWrapper = (props) => {
    return (
        <div className="d-flex align-items-center justify-content-center authwrapper_container">
            <div className="col-md-4 border p-4 authwrapper_container__content">
                {props.children}
            </div>
        </div>
    )
}

export default AuthWrapper
